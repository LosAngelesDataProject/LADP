using LADP_EFC.Data;
using LADP_EFC.DTO.Users;
using LADP_EFC.Models.Users;
using LADP_EFC.Repository.Interfaces;

namespace LADP_EFC.Repository
{
    public class RepositoryUser : IRepositoryUser
    {
        private readonly DataContext _context;

        public RepositoryUser(DataContext context)
        {
            _context = context;
        }

        public UserDTO Create(AddUserDTO model)
        {
            string initialStatus = "Not Confirmed";
            var newUser = new User
            {
                Email = model.Email,
                Password = model.Password,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Mi = model.Mi,
                Status = initialStatus,

            };
            _context.Users.Add(newUser);
            _context.SaveChanges();

            return MapUser(newUser);
        }

        public IEnumerable<UserDTO> GetAll()
        {
            throw new NotImplementedException();
        }

        public UserDTO GetById(int id)
        {
            throw new NotImplementedException();
        }

        public UserDTO Update(UserDTO updateUser)
        {
            throw new NotImplementedException();
        }
        /*
        private string CreateUserToken(int userId)
        {
            string token = Guid.NewGuid().ToString();
            var newToken = new UserToken
            {
                Token = token,
                UserId = userId,
            };
            _context.UserToken.Add(newToken);
            _context.SaveChanges();

            return token;

        }
        */
        private static UserDTO MapUser(User user)
        {
            var mappedItem = new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Mi = user.Mi,
                Status = user.Status,
            };
            return mappedItem;
        }
    }
}
