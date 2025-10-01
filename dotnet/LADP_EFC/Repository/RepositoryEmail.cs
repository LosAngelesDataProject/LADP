using LADP_EFC.Repository.Interfaces;
using Task = System.Threading.Tasks.Task;
using brevo_csharp.Model;
using brevo_csharp.Api;
using Microsoft.Extensions.Options;
using Configuration = brevo_csharp.Client.Configuration;
using LADP_EFC.Data.Enitities;


namespace LADP_EFC.Repository
{
    public class RepositoryEmail(IOptions<AppSettings> config, IOptions<BrevoApi> brevoApi) : IRepositoryEmail
    {

        private readonly string baseUrl = config.Value.BaseUrl;
        private readonly BrevoApi brevo = brevoApi.Value;

        public async Task TestEmail()
        {
            try
            {
                // Prepare the test email data
                var email = new SendSmtpEmail
                {
                    Sender = new SendSmtpEmailSender
                    {
                        Email = brevo.SenderEmail,
                        Name = brevo.SenderName,
                    },
                    To = new List<SendSmtpEmailTo>
                    {
                        new SendSmtpEmailTo(brevo.TestRecipient)
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
            var config = new Configuration();
            config.ApiKey["api-key"] = brevo.ApiKey;
            var apiInstance = new TransactionalEmailsApi(config);

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

    public class AppSettings
    {
    }
}
