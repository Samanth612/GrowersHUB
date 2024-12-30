interface Faq {
  question: string;
  answer: string;
}

interface Action {
  type: string;
  payload: {
    data: Faq[];
  };
}

const initialState: Faq[] = [];

export default function faqs(state = initialState, action: Action): Faq[] {
  switch (action.type) {
    case "faqsData":
      return action.payload.data;
    default:
      return state;
  }
}
