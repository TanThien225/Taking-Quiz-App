using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QuizApp_API.Controllers
{
	public class Participant
	{
		[Key]
		public int TesterId { get; set; }

		[Column(TypeName = "nvarchar(50)")]
		public string Email { get; set; }

		[Column(TypeName = "nvarchar(50)")]
		public string Name { get; set; }

		public int Score { get; set; }

		public int TimeSpend { get; set; }
	}

	public class ParticipantRestult
	{
		public int ParticipantId { get; set; }

		public int Score { get; set; }

		public int TimeTaken { get; set; }
	}
}
