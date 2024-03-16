using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QuizApp_API.Controllers
{
	public class Question
	{
		[Key]
		public int QuestionId { get; set; }

		[Column(TypeName = "nvarchar(250)")]
		public string QuestionContent { get; set; }

		[Column(TypeName = "nvarchar(500)")]
		public string? QuestionImage { get; set; }

		[Column(TypeName = "nvarchar(50)")]
		public string Option1 { get; set; }

		[Column(TypeName = "nvarchar(50)")]
		public string Option2 { get; set; }

		[Column(TypeName = "nvarchar(50)")]
		public string Option3 { get; set; }

		[Column(TypeName = "nvarchar(50)")]
		public string Option4 { get; set; }

		public int TheAnswer { get; set; }
	}
}
