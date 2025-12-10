using LADP_EFC.Data;
using LADP_EFC.DTO.Users;
using LADP_EFC.Repository;
using LADP_EFC.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LADP.Tests.Repositories
{
    public class RepositoryUserTests : IDisposable
    {
        private readonly DataContext _context;
        private readonly Mock<IRepositoryEmail> _mockEmailRepo;
        private readonly RepositoryUser _repository;

        public RepositoryUserTests()
        {
            // new DB per test class instance
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()) 
                .Options;

            _context = new DataContext(options);
            _mockEmailRepo = new Mock<IRepositoryEmail>();
            _repository = new RepositoryUser(_context, _mockEmailRepo.Object);
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        private UserDTO CreateUser(AddUserDTO addUserDto)
        {
            return _repository.Create(addUserDto);
        }

        // Should persist user, create token, and email the same token
        [Fact]
        public void CreateUserTest()
        {
            // Arrange
            var addUserDto = new AddUserDTO
            {
                Email = "unit@test.com",
                Password = "Password123!",
                PasswordConfirm = "Password123!",
                FirstName = "Jane",
                LastName = "Doe",
                Mi = "A",
                Phone = ""
            };

            string tokenSentToEmail = null;

            _mockEmailRepo
                .Setup(e => e.EmailConfirm(It.IsAny<AddUserDTO>(), It.IsAny<string>()))
                .Callback<AddUserDTO, string>((dto, token) =>
                {
                    tokenSentToEmail = token;
                })
                .Returns(Task.CompletedTask);

            // Act
            var createdDto = CreateUser(addUserDto);

            // Assert: User saved
            var userInDb = _context.Users.FirstOrDefault(u => u.Id == createdDto.Id);
            Assert.NotNull(userInDb);
            Assert.Equal(addUserDto.Email, userInDb.Email);
            Assert.Equal("Not Confirmed", userInDb.Status);

            // Assert: Token exists
            var tokenRow = _context.UserTokens.FirstOrDefault(t => t.UserId == userInDb.Id);
            Assert.NotNull(tokenRow);

            // Assert: Repo emailed same token stored in DB
            Assert.Equal(tokenRow.Token, tokenSentToEmail);

            _mockEmailRepo.Verify(
                e => e.EmailConfirm(It.Is<AddUserDTO>(d => d.Email == addUserDto.Email),
                It.IsAny<string>()),
                Times.Once);
        }

        // Should update user status and delete token
        [Fact]
        public async Task ConfirmAccountTest()
        {
            // Arrange: create user + token
            var addUserDto = new AddUserDTO
            {
                Email = "confirm@test.com",
                Password = "Password123!",
                PasswordConfirm = "Password123!",
                FirstName = "John",
                LastName = "Doe",
                Mi = "B",
                Phone = ""
            };

            var createdDto = _repository.Create(addUserDto);
            var testToken = _context.UserTokens.First(t => t.UserId == createdDto.Id);

            // Act
            await _repository.ConfirmAccount(testToken.Token);

            // Assert: User is confirmed
            var updatedUser = await _context.Users.FindAsync(createdDto.Id);
            Assert.Equal("Confirmed", updatedUser.Status);

            // Assert: Token removed
            var deletedToken = _context.UserTokens.FirstOrDefault(t => t.Token == testToken.Token);
            Assert.Null(deletedToken);
        }
    }
}