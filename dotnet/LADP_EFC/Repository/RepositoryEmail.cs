using LADP_EFC.Repository.Interfaces;
using Task = System.Threading.Tasks.Task;
using brevo_csharp.Model;
using brevo_csharp.Api;
using Microsoft.Extensions.Options;
using Configuration = brevo_csharp.Client.Configuration;
using LADP_EFC.Data.Enitities;
using LADP_EFC.DTO.Users;


namespace LADP_EFC.Repository
{
    public class RepositoryEmail(IOptions<BrevoApi> brevoApi) : IRepositoryEmail
    {

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
                    To =
                    [
                        new SendSmtpEmailTo(brevo.TestRecipient)
                    ],
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
        public async Task EmailConfirm(AddUserDTO model, string tokenId)
        {
            try
            {
                var email = new SendSmtpEmail
                {
                    Sender = new SendSmtpEmailSender
                    {
                        Email = brevo.SenderEmail,
                        Name = brevo.SenderName,
                    },
                    To =
                    [
                        new SendSmtpEmailTo(model.Email)
                    ],
                    Subject = "Confirm your Email Address",
                    HtmlContent = LoadHtmlTemplate("emailConfirmation.html", brevo.BaseUrl, model.FirstName, tokenId)
                };

                await SendEmailAsync(email);
                Console.WriteLine("Confirmation email sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception when sending confirmation email: {ex.Message}");
            }
            ;
        }

        private static string LoadHtmlTemplate(string templateFileName, string url, string firstName = null, string tokenId = null)
        {
            try
            {
                string templatePath = Path.Combine("Models", "Emails", "EmailTemplates", templateFileName);

                if (File.Exists(templatePath))
                {
                    string htmlContent = File.ReadAllText(templatePath);

                    if (!string.IsNullOrEmpty(tokenId))
                    {
                        string confirmationLink = $"{url}/confirmuser?tokenId={tokenId}";

                        htmlContent = htmlContent
                            .Replace("Confirm-Link-Insert", confirmationLink)
                            .Replace("Users-First-Name", firstName ?? "User");

                        return htmlContent;
                    }

                    return htmlContent;
                }
                else
                {
                    return $"Template file not found: {templatePath}";
                }
            }
            catch (Exception ex)
            {
                return $"Error loading HTML template: {ex.Message}";
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
}