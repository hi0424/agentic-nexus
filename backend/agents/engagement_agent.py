class CustomerEngagementAgent:
    def converse(self, diagnosis, user_response="ACCEPT"):
        explanation = (
            f"⚠️ Brake failure predicted in {diagnosis['days_to_failure']} days. "
            "Driving further may be unsafe."
        )

        if user_response == "DECLINE":
            follow_up = "Delaying service may increase risk. Would tomorrow work?"
        else:
            follow_up = "Shall I schedule a service appointment now?"

        return explanation + " " + follow_up
