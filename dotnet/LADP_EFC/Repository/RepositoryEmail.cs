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

            SendSmtpEmailTo smtpEmailTo = new SendSmtpEmailTo("jaredndev@gmail.com");

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

        //public static void SendEmail(string senderEmail, string senderName,
        //    string receiverEmail, string receiverName, string subject, string message)
        //{
        //    var apiInstance = new TransactionalEmailsApi();
        //    SendSmtpEmailSender sender = new SendSmtpEmailSender(senderName, senderEmail);

        //    SendSmtpEmailTo recevier1 = new SendSmtpEmailTo(receiverEmail, receiverName);
        //    List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo>();
        //    To.Add(recevier1);

        //    string HtmlContent = null;
        //    string TextContent = message;

        //    try
        //    {
        //        var sendSmtpEmail = new SendSmtpEmail(sender, To, null, null, HtmlContent, TextContent, subject);
        //        CreateSmtpEmail result = apiInstance.SendTransacEmail(sendSmtpEmail);
        //        Console.WriteLine("Brevo Response:" + result.ToJson());
        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine("Brevo Exception:" + e.Message);
        //    }
        //}

        //public Task SendEmailAsync(string email, string subject, string message)
        //{
        //    var mail = "example@Email.com";
        //    var pw = "pass123";

        //    var client = new SmtpClient("smtp-mail.outlook.com", 587)
        //    {
        //        EnableSsl = true,
        //        Credentials = new NetworkCredential(mail, pw)
        //    };
        //    return client.SendMailAsync(
        //        new MailMessage(from: mail,
        //                        to: email,
        //                        subject,
        //                        message));
        //}
    }
}
