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

namespace LADP.Tests.Repository
{
    public class UserRepositoryTests
    {
<<<<<<< HEAD
        private readonly DataContext _context;
        private readonly Mock<IRepositoryEmail> _mockEmailRepo;
        private readonly RepositoryUser _repository;

        public UserRepositoryTests()
        {
            // Shared setup
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()) // unique for test run
                .Options;

            _context = new DataContext(options);
            _mockEmailRepo = new Mock<IRepositoryEmail>();
            _repository = new RepositoryUser(_context, _mockEmailRepo.Object);
        }

        private void ResetDatabase()
        {
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
        }

        // Helper to create a test user with configurable email
        private (AddUserDTO dto, UserDTO result) CreateTestUser(string email = "test@example.com")
        {
            var addUserDto = new AddUserDTO
            {
                Email = email,
=======
        private DataContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new DataContext(options);
        }
    
        [Fact]
        public void CreateUserTest() 
        { 
            // Set up in-memory DB and mock dependencies
            var context = GetInMemoryDbContext();
            var mockEmailRepo = new Mock<IRepositoryEmail>();
            var repository = new RepositoryUser(context, mockEmailRepo.Object);
            
            // Stock data
            var addUserDto = new AddUserDTO
            {
                Email = "test@example.com",
>>>>>>> 606e316 (Installed NuGet packages and file for createUser unit testing)
                Password = "Password123!",
                PasswordConfirm = "Password123!",
                FirstName = "Jane",
                LastName = "Doe",
                Mi = "A",
                Phone = ""
            };

<<<<<<< HEAD
            var result = _repository.Create(addUserDto);
            return (addUserDto, result);
        }

        [Fact]
        public async Task CreateUserTest_ShouldAddUser_AndTriggerEmail()
        {
            // Arrange
            ResetDatabase();

            // Act
            var (addUserDto, result) = CreateTestUser();

            // Assert
            var user = await _context.Users.FindAsync(result.Id);
=======
            var result = repository.Create(addUserDto);

            // Verify results
            var user = context.Users.FirstOrDefault(u => u.Email == addUserDto.Email);
>>>>>>> 606e316 (Installed NuGet packages and file for createUser unit testing)
            Assert.NotNull(user);

            // Verify if stock data matches repository data
            Assert.Equal(addUserDto.Email, user.Email);
            Assert.Equal(addUserDto.FirstName, user.FirstName);
            Assert.Equal(addUserDto.LastName, user.LastName);
            Assert.Equal(addUserDto.Mi, user.Mi);
            Assert.Equal("Not Confirmed", user.Status);

<<<<<<< HEAD
            // Verify if token was created
            var token = _context.UserTokens.FirstOrDefault(t => t.UserId == user.Id);
            Assert.NotNull(token);

            // Verify if EmailConfirm() was called
            _mockEmailRepo.Verify(e => e.EmailConfirm(addUserDto, It.IsAny<string>()), Times.Once);
        }
    }

}
=======
            var token = context.UserTokens.FirstOrDefault(t => t.UserId == user.Id);
            Assert.NotNull(token);

            // Verify if repository data matches mapped data
            Assert.Equal(user.Email, result.Email);
            Assert.Equal(user.FirstName, result.FirstName);
            Assert.Equal(user.LastName, result.LastName);
            Assert.Equal(user.Status, result.Status);

            // Verify if method was triggered
            mockEmailRepo.Verify(e => e.EmailConfirm(addUserDto, It.IsAny<string>()), Times.Once);
        }
    }

}
>>>>>>> 606e316 (Installed NuGet packages and file for createUser unit testing)
