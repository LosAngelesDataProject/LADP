using Microsoft.AspNetCore.Identity;
using LADP_EFC.Data.Enitities.Users;

namespace LADP_EFC.Utilities
{
    public static class PasswordHasherUtil
    {
        // Internal .NET hasher used for standard Base64 hashing
        private static readonly PasswordHasher<User> _hasher = new PasswordHasher<User>();

        public static string Hash(User user, string password)
        {
            return _hasher.HashPassword(user, password);
        }

        public static bool Verify(User user, string hashedResult, string providedPassword)
        {
            if (string.IsNullOrEmpty(hashedResult)) return false;

            try
            {
                var result = _hasher.VerifyHashedPassword(user, hashedResult, providedPassword);
                return result == PasswordVerificationResult.Success;
            }
            catch (FormatException)
            {
                // Returns false instead of throwing a 500 error if string is invalid
                return false;
            }
        }
    }
}