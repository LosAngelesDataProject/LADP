using LADP_EFC.Data.Enitities.Users;
using LADP_EFC.DTO.Users;

namespace LADP_EFC.Repository.Interfaces
{
    public interface IRepositoryUser
    {
        UserDTO GetById(int id);
        IEnumerable<UserDTO> GetAll();
        UserDTO Create(AddUserDTO model);
        UserDTO Update(UserDTO updateUser);
        Task ConfirmAccount(string tokenId);
        User? GetByEmail(string email);

    }

}
