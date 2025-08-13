using LADP_EFC.DTO.Users;

namespace LADP_EFC.Repository.Interfaces
{
    public interface IRepositoryEmail
    {
        Task TestEmail();

        Task EmailConfirm(AddUserDTO model, string token);
    }
}
