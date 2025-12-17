class CustomerEngagementAgent:
    def converse(self, diagnosis, user_response="ACCEPT"):
        if diagnosis["days_to_failure"] <= 3:
            tone = "URGENT"
            risk = "Immediate safety risk detected."
        else:
            tone = "ADVISORY"
            risk = "Performance degradation expected soon."
        
        explanation = (
        f"⚠️ {risk} Failure predicted in "
        f"{diagnosis['days_to_failure']} days."
        )

        follow_up = (
        "Would you like me to schedule service now?"
        if user_response == "ACCEPT"
        else "Delaying may increase repair cost. Reschedule?"
       )
    
        return {
        "tone": tone,
        "message": explanation + " " + follow_up
      }
