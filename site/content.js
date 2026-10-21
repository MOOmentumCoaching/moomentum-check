/*
  MOOmentum Check: all the words in the app live here.

  You can safely edit any text between the backticks (`like this`).
  Keep the pillars in the same order once people are using the app:
  saved report links store scores in this order.
*/

window.MOO_CONTENT = {
  intro: {
    // One entry per line. Words wrapped in *stars* are highlighted.
    headline: [`Take the`, `*MOOmentum* check.`, `See where *you* are.`],
    points: [
      `10 quick questions`,
      `About 2 minutes`,
      `A personal report to keep`,
    ],
    namePrompt: `WHAT IS YOUR NAME?`,
    namePlaceholder: `Enter your name`,
    startButton: `START`,
  },

  quiz: {
    instruction: `Thinking about the past four weeks, how true is this for you?`,
    lowLabel: `Not at all true`,
    highLabel: `Completely true`,
  },

  // Each pillar is scored from 1 to 7.

  // Score bands used for the colours on each pillar.
  bands: [
    { max: 2, label: `Needs support`, colour: `red` },
    { max: 4, label: `Building`, colour: `amber` },
    { max: 7, label: `Strong`, colour: `green` },
  ],

  // Overall rank, from the total of all ten scores (10–70).
  ranks: [
    { below: 28, label: `Foundation` },
    { below: 39, label: `Emerging` },
    { below: 49, label: `Developing` },
    { below: 60, label: `Strong` },
    { below: 71, label: `Mentathlete` },
  ],

  report: {
    starting: `This isn't your permanent rating. It's your starting build.`,
    keepTitle: `Keep your report`,
    keepText: `Nothing is saved anywhere, not even on your phone. Your link is your report, so bookmark it, copy it or save it as a PDF if you want to look back.`,
    missionTitle: `Your next mission`,
    missionLead: `Your three lowest pillars right now, with small actions to try. Start small, repeat it, then level up.`,
    tip: `Pick one action. Do it daily.`,
    restartButton: `Restart`,
    disclaimer: `This is a self-reflection tool, not a medical or psychological assessment. If you are struggling, please speak to your GP or a qualified professional.`,
  },

  pillars: [
    {
      name: `Emotional Awareness`,
      short: `Emotion`,
      icon: `emotional-awareness`,
      character: `self-aware-operator`,
      type: `The Self-Aware Operator`,
      summary: `You notice what you feel and use it to choose your response, rather than letting it choose for you.`,
      why: `Noticing what you feel gives you a choice in how you respond.`,
      question: `I can recognise what I am feeling and understand how it affects me.`,
      actions: [
        `Name one emotion you feel each day, without judging it.`,
        `Pause before reacting and ask: what is this feeling telling me?`,
        `Write down one trigger and the response it created.`,
      ],
    },
    {
      name: `Purpose`,
      short: `Purpose`,
      icon: `purpose`,
      character: `mission-led-player`,
      type: `The Mission-Led Player`,
      summary: `You know what matters to you, and that sense of direction keeps you moving when things get hard.`,
      why: `A clear direction gives you something to return to when motivation dips.`,
      question: `I have a clear sense of what matters to me and what I am working towards.`,
      actions: [
        `Choose one goal that genuinely matters this month.`,
        `Write down why that goal matters to you.`,
        `Take one ten-minute action towards it today.`,
      ],
    },
    {
      name: `Cognitive Agility`,
      short: `Agility`,
      icon: `cognitive-agility`,
      character: `adaptive-thinker`,
      type: `The Adaptive Thinker`,
      summary: `You can change your thinking when the situation changes, and find a new route when the old one is blocked.`,
      why: `Adjusting your thinking helps you find a way forward when plans change.`,
      question: `I can adapt my thinking when circumstances or information change.`,
      actions: [
        `Find one alternative explanation for a frustrating situation.`,
        `Ask: what would I advise a friend to do here?`,
        `Change one routine this week and notice what you learn.`,
      ],
    },
    {
      name: `Creativity`,
      short: `Creativity`,
      icon: `creativity`,
      character: `creative-playmaker`,
      type: `The Creative Playmaker`,
      summary: `You come up with fresh ideas and different angles, which helps you solve problems others get stuck on.`,
      why: `Feeling stuck often calls for a different approach, and new ideas take practice.`,
      question: `I can generate different ideas and approaches when solving a problem.`,
      actions: [
        `List five possible answers before choosing one.`,
        `Spend ten minutes creating with no pressure to be good.`,
        `Solve one familiar problem in a deliberately different way.`,
      ],
    },
    {
      name: `Sleep`,
      short: `Sleep`,
      icon: `sleep`,
      character: `recovery-specialist`,
      type: `The Recovery Specialist`,
      summary: `You protect your rest, and it shows in your energy, focus and mood.`,
      why: `Sleep supports your attention, mood and learning.`,
      question: `My sleep leaves me rested and able to function effectively.`,
      actions: [
        `Keep the same wake-up time for the next three days.`,
        `Create a 30-minute screen-free wind-down.`,
        `Keep caffeine away from the final eight hours before bed.`,
      ],
    },
    {
      name: `Nutrition`,
      short: `Nutrition`,
      icon: `nutrition`,
      character: `fuelled-performer`,
      type: `The Fuelled Performer`,
      summary: `You fuel yourself well, giving your body and mind steady energy to perform.`,
      why: `Regular fuel gives you steady energy to meet daily demands.`,
      question: `My usual food and hydration choices support my energy and performance.`,
      actions: [
        `Start the day with a full glass of water.`,
        `Include a protein source in your next main meal.`,
        `Prepare one supportive snack before you need it.`,
      ],
    },
    {
      name: `Movement`,
      short: `Movement`,
      icon: `movement`,
      character: `active-engine`,
      type: `The Active Engine`,
      summary: `You keep your body moving, and that movement powers your mood and mental sharpness.`,
      why: `Movement lifts your mood and lets you practise effort and persistence.`,
      question: `I move regularly enough to support my physical and mental fitness.`,
      actions: [
        `Take a ten-minute walk today.`,
        `Break up long sitting periods with two minutes of movement.`,
        `Schedule one enjoyable movement session this week.`,
      ],
    },
    {
      name: `Stress Management`,
      short: `Stress`,
      icon: `stress-management`,
      character: `pressure-controller`,
      type: `The Pressure Controller`,
      summary: `You spot pressure building and have ways to bring it back down before it takes over.`,
      why: `Pressure is easier to handle when you have more than one way to respond.`,
      question: `I recognise pressure building and have effective ways to manage it.`,
      actions: [
        `Take five slow breaths with a longer exhale.`,
        `Identify one pressure you can control and one you cannot.`,
        `Protect ten minutes of genuine recovery today.`,
      ],
    },
    {
      name: `Connection`,
      short: `Connection`,
      icon: `connection`,
      character: `team-builder`,
      type: `The Team Builder`,
      summary: `You have people you can be open with and rely on, and you are someone others can rely on too.`,
      why: `The right people give you perspective, encouragement and support.`,
      question: `I feel connected to people I can speak to openly and rely upon.`,
      actions: [
        `Message someone you trust and ask how they really are.`,
        `Arrange one face-to-face or voice conversation this week.`,
        `Share one honest thing instead of saying you are fine.`,
      ],
    },
    {
      name: `Courage`,
      short: `Courage`,
      icon: `courage`,
      character: `courageous-starter`,
      type: `The Courageous Starter`,
      summary: `You act even when it feels uncomfortable, and that willingness to start opens doors for you.`,
      why: `Small brave actions stop fear from getting the deciding vote.`,
      question: `I take necessary action even when I feel uncertain or uncomfortable.`,
      actions: [
        `Choose the smallest version of the action you are avoiding.`,
        `Set a five-minute timer and begin before you feel ready.`,
        `Record what happened after you acted despite discomfort.`,
      ],
    },
  ],
};
