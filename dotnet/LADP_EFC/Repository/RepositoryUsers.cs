using LADP_EFC.Data;
using LADP_EFC.Data.Enitities.Users;
using LADP_EFC.DTO.Users;
using LADP_EFC.Repository.Interfaces;
using LADP_EFC.Utilities;
using Microsoft.EntityFrameworkCore;

namespace LADP_EFC.Repository
{
    public class RepositoryUser : IRepositoryUser
    {
        private readonly DataContext _context;
        private IRepositoryEmail RepositoryEmail;

        public RepositoryUser(DataContext context, IRepositoryEmail repositoryEmail)
        {
            _context = context;
            RepositoryEmail = repositoryEmail ?? throw new ArgumentNullException(nameof(repositoryEmail));
        }

        public IEnumerable<UserDTO> GetAll()
        {
            return _context.Users
                .Select(u => MapUser(u))
                .ToList();
        }

        public UserDTO Create(AddUserDTO model)
        {
            string initialStatus = "Not Confirmed";
            var newUser = new User
            {
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Mi = model.Mi,
                Status = initialStatus,
                DateCreated = DateTime.UtcNow,
                DateModified = DateTime.UtcNow,
            };

            // Hash the password before saving to the DB
            newUser.Password = PasswordHasherUtil.Hash(newUser, model.Password);

            _context.Users.Add(newUser);
            _context.SaveChanges();

            string token = CreateUserToken(newUser.Id);
            RepositoryEmail.EmailConfirm(model, token);
            return MapUser(newUser);
        }

        //public UserDTO Create(AddUserDTO model)
        //{
        //    string initialStatus = "Not Confirmed";
        //    var newUser = new User
        //    {
        //        Email = model.Email,
        //        Password = model.Password,
        //        FirstName = model.FirstName,
        //        LastName = model.LastName,
        //        Mi = model.Mi,
        //        Status = initialStatus,
        //        DateCreated = DateTime.UtcNow,
        //        DateModified = DateTime.UtcNow,

        //    };
        //    _context.Users.Add(newUser);
        //    _context.SaveChanges();
        //    string token = CreateUserToken(newUser.Id);
        //    RepositoryEmail.EmailConfirm(model, token);
        //    return MapUser(newUser);
        //}

        public UserDTO GetById(int id)
        {
            throw new NotImplementedException();
        }

        public User? GetByEmail(string email)
        {
            return _context.Users.SingleOrDefault(u => u.Email == email);
        }


        public UserDTO Update(UserDTO updateUser)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateUserStatus(int id, string status)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                user.Status = status;
                user.DateModified = DateTime.Now;
                await _context.SaveChangesAsync();
            }
        }

        private string CreateUserToken(int userId)
        {
            var newToken = new UserToken
            {
                Token = Guid.NewGuid().ToString(),
                UserId = userId,
            };
            _context.UserTokens.Add(newToken);
            _context.SaveChanges();

            return newToken.Token;

        }

        public async Task ConfirmAccount(string tokenId)
        {
            if (string.IsNullOrEmpty(tokenId))
            {
                throw new ArgumentNullException("token missing or empty");
            }
            var token = await _context.UserTokens.FirstOrDefaultAsync(t => t.Token == tokenId);
            if (token == null)
            {
                Console.WriteLine($"Token not found: {tokenId}");
                throw new Exception($"No user found for the token: {tokenId}");
            }
            await UpdateUserStatus(token.UserId, "Confirmed");
            _context.UserTokens.Remove(token);
            try
            {

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                Console.WriteLine("Token already deleted. Safe to Ignore");
            }
        }

        public int GetByToken(string tokenId)
        {
            var token = _context.UserTokens.FirstOrDefault(t => t.Token == tokenId);
            if (token == null)
            {
                return 0;
            }
            return token.UserId;
        }

        public async Task<UserToken> DeleteUserToken(string tokenId)
        {
            var token = _context.UserTokens.Find(tokenId);
            if (token != null)
            {
                _context.UserTokens.Remove(token);
                await _context.SaveChangesAsync();
                return token;
            }
            else
            {
                throw new Exception("Token not found, cannot delete");
            }
        }

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
