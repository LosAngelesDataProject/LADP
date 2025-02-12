using LADP_EFC.DTO.Users;

namespace LADP_EFC.Repository.Interfaces
{
        public interface IRepositoryUser
        {
            UserDTO GetById(int id);
            IEnumerable<UserDTO> GetAll();
            UserDTO Create(AddUserDTO model);
            UserDTO Update(UserDTO updateUser);

        }
    
}
