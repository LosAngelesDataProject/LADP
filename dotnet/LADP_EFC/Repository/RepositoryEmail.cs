using LADP_EFC.Models.AppSettings;
using LADP_EFC.Repository.Interfaces;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using Task = System.Threading.Tasks.Task;

namespace LADP_EFC.Repository
{
    public class RepositoryEmail : IRepositoryEmail
    {

        private BrevoApi _brevo;
        public RepositoryEmail(IOptions<BrevoApi> brevo)
        {
            _brevo = brevo.Value;
        }

        public async Task TestEmail()
        {
            string senderEmail = _brevo.SenderEmail;
            string nameOfSender = _brevo.SenderName;
            SendSmtpEmailSender senderInfo = new SendSmtpEmailSender(nameOfSender, senderEmail);

            SendSmtpEmailTo smtpEmailTo = new SendSmtpEmailTo("na106@mail.chapman.edu");

            List<SendSmtpEmailTo> emailRecipients = new List<SendSmtpEmailTo>();
            emailRecipients.Add(smtpEmailTo);

            var sendSmtpEmail = new SendSmtpEmail(senderInfo, emailRecipients)
            {
                Subject = "Test Email",
                TextContent = "Testing."
            };
            await SendEmailAsync(sendSmtpEmail);
        }

        private async Task SendEmailAsync(SendSmtpEmail email)
        {
            try
            {
                Configuration.Default.ApiKey["api-key"] = _brevo.ApiKey;
                var apiInstance = new TransactionalEmailsApi();
                CreateSmtpEmail result = await apiInstance.SendTransacEmailAsync(email);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message, "An error occured while sending email.");
                throw;
            }
        }
    }
}
