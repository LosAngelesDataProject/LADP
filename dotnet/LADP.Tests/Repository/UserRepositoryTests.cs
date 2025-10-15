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
                Password = "Password123!",
                PasswordConfirm = "Password123!",
                FirstName = "Jane",
                LastName = "Doe",
                Mi = "A",
                Phone = ""
            };

            var result = repository.Create(addUserDto);

            // Verify results
            var user = context.Users.FirstOrDefault(u => u.Email == addUserDto.Email);
            Assert.NotNull(user);

            // Verify if stock data matches repository data
            Assert.Equal(addUserDto.Email, user.Email);
            Assert.Equal(addUserDto.FirstName, user.FirstName);
            Assert.Equal(addUserDto.LastName, user.LastName);
            Assert.Equal(addUserDto.Mi, user.Mi);
            Assert.Equal("Not Confirmed", user.Status);

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
