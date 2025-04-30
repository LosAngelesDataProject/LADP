using LADP_EFC.Repository.Interfaces;
using Task = System.Threading.Tasks.Task;
using DotNetEnv;
using brevo_csharp.Model;
using brevo_csharp.Api;
using brevo_csharp.Client;
using LADP_EFC.DTO.Users;
using Microsoft.Extensions.Options;
using LADP_EFC.Models.AppSettings;

namespace LADP_EFC.Repository
{
    public class RepositoryEmail : IRepositoryEmail
    {

        private readonly string apiKey;
        private readonly string senderEmail;
        private readonly string senderName;
        

        public RepositoryEmail()
        {
            apiKey = Env.GetString("BREVO_API_KEY");
            senderEmail = Env.GetString("SENDER_EMAIL");
            senderName = Env.GetString("SENDER_NAME");
            
        }

        public async Task TestEmail()
        {
            try
            {
                // Prepare the test email data
                var email = new SendSmtpEmail
                {
                    Sender = new SendSmtpEmailSender
                    {
                        Email = senderEmail,
                        Name = senderName,
                    },
                    To = new List<SendSmtpEmailTo>
                    {
                        new SendSmtpEmailTo("na106@mail.chapman.edu")
                    },
                    Subject = "Test Email",
                    HtmlContent = "<html><body><h1>This is a test email</h1></body></html>"
                };

                // Call the private method to send the email
                await SendEmailAsync(email);
                Console.WriteLine("Test email sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception when sending test email: {ex.Message}");
            }
        }

       



        private async Task SendEmailAsync(SendSmtpEmail email)
        {
            // Initialize the Brevo API client with the API key
            var apiInstance = new TransactionalEmailsApi();
            Configuration.Default.ApiKey["api-key"] = apiKey;

            try
            {
                // Send the email
                await apiInstance.SendTransacEmailAsync(email);
                Console.WriteLine("Email sent successfully!");
            }
            catch (Exception ex)
            {
                // Log the error if something goes wrong
                Console.WriteLine($"Exception when calling Brevo API: {ex.Message}");
            }
        }
    }
}
