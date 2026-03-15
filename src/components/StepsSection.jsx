const steps = [
  {
    number: 1,
    title: "Answer Questions",
    text: "Respond honestly to 10 questions about your study habits"
  },
  {
    number: 2,
    title: "Get Your Persona",
    text: "Discover which learning style matches you best"
  },
  {
    number: 3,
    title: "Improve Your Study Habits",
    text: "Apply personalized tips to enhance your learning"
  }
]

const StepsSection = () => {
  return (
    <div className="steps-container">
      {steps.map((step) => (
        <div key={step.number} className="step-item">

          <div className="step-number">
            {step.number}
          </div>

          <div className="step-content">
            <h4>{step.title}</h4>
            <p>{step.text}</p>
          </div>

        </div>
      ))}
    </div>
  )
}

export default StepsSection