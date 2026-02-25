export interface Question {
  id: number;
  question: string;
  options: {
    CE: string;
    RO: string;
    AC: string;
    AE: string;
  };
}

export interface Answers {
  CE: number;
  RO: number;
  AC: number;
  AE: number;
}

export type LearningStyle = 'Accommodating' | 'Diverging' | 'Converging' | 'Assimilating';

export interface StyleDescription {
  title: string;
  koreanTitle: string;
  description: string;
  characteristics: string[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "학습할 때 나는",
    options: {
      CE: "느낌에 따라 학습하기를 좋아한다.",
      RO: "보고 듣는 것을 좋아한다.",
      AC: "개념에 대하여 생각하기를 좋아한다.",
      AE: "실제 활동하는 것을 좋아한다."
    }
  },
  {
    id: 2,
    question: "나는",
    options: {
      CE: "나의 직감과 느낌을 확신할 때 가장 잘 학습한다.",
      RO: "학습내용을 주의깊게 보고 들을 때 가장 잘 학습한다.",
      AC: "학습내용을 논리적으로 사고할 때 가장 잘 학습한다.",
      AE: "학습활동을 끝낼 때 까지 열심히 노력할 때 가장 잘 학습한다."
    }
  },
  {
    id: 3,
    question: "학습하고 있을 때 나는",
    options: {
      CE: "학습내용에 대하여 강한 느낌이 오며, 그 내용에 반응한다.",
      RO: "조용하고 말수가 적다.",
      AC: "학습내용에 대하여 논리적으로 생각하는 경향이 있다.",
      AE: "학습한 것에 대하여 책임을 진다."
    }
  },
  {
    id: 4,
    question: "나는",
    options: {
      CE: "느낌에 의해서 학습한다.",
      RO: "관찰에 의해서 학습한다.",
      AC: "사례에 의해서 학습한다.",
      AE: "행동에 의해서 학습한다."
    }
  },
  {
    id: 5,
    question: "학습할 때 나는",
    options: {
      CE: "새로운 경험을 잘 받아들인다.",
      RO: "모든 문제점을 살펴본다.",
      AC: "학습내용을 분석하고 분류하기를 좋아한다.",
      AE: "어떤 것을 시도해 보기를 좋아한다."
    }
  },
  {
    id: 6,
    question: "학습하고 있을 때 나는",
    options: {
      CE: "직관적인 사람이다.",
      RO: "관찰적인 사람이다.",
      AC: "논리적인 사람이다.",
      AE: "활동적인 사람이다."
    }
  },
  {
    id: 7,
    question: "나는",
    options: {
      CE: "대인관계(대화, 토론, 분석)을 통해 가장 잘 학습한다.",
      RO: "관찰을 통해서 가장 잘 학습한다.",
      AC: "합리적 이론을 통해서 가장 잘 학습한다.",
      AE: "시도해보거나 연습을 통해서 가장 잘 학습한다."
    }
  },
  {
    id: 8,
    question: "학습할 때 나는",
    options: {
      CE: "나 자신이 학습내용에 직접 관여되어 있다고 느낀다.",
      RO: "학습내용을 실행하기 전에 생각할 시간을 가진다.",
      AC: "개념이나 이론을 좋아한다.",
      AE: "학습한 결과를 보기를 원한다."
    }
  },
  {
    id: 9,
    question: "나는",
    options: {
      CE: "나의 느낌에 의지할 때 가장 잘 학습한다.",
      RO: "나의 관찰에 의지할 때 가장 잘 학습한다.",
      AC: "나의 생각에 의지할 때 가장 잘 학습한다.",
      AE: "어떤 것을 스스로 시도할 때 가장 잘 학습한다."
    }
  },
  {
    id: 10,
    question: "학습할 때 나는",
    options: {
      CE: "학습내용을 잘 받아들이는 사람이다.",
      RO: "말수가 적은 사람이다.",
      AC: "합리적인 사람이다.",
      AE: "책임을 다하는 사람이다."
    }
  },
  {
    id: 11,
    question: "학습할 때 나는",
    options: {
      CE: "몰두한다.",
      RO: "관찰하기 좋아한다.",
      AC: "학습내용을 평가한다.",
      AE: "활동적인 것을 좋아한다."
    }
  },
  {
    id: 12,
    question: "나는",
    options: {
      CE: "무엇이든 잘 받아들이고, 개방적인 자세일 때 가장 잘 학습한다.",
      RO: "신중할 때 가장 잘 학습한다.",
      AC: "개념을 분석할 때 가장 잘 학습한다.",
      AE: "실제로 경험할 때 가장 잘 학습한다."
    }
  }
];

export const STYLE_DESCRIPTIONS: Record<LearningStyle, StyleDescription> = {
  Accommodating: {
    title: 'Accommodating',
    koreanTitle: '조정자',
    description: '학습에 있어서 순응자와 반대되는 강점을 지니고 있으며 구체적인 경험과 능동적 실행에서 가장 잘 학습합니다. 이 양식에 속하는 학습자는 직접 일을 실행 따라하며, 계획과 실행을 수행하고 새로운 경험에 자신을 몰두시키는데 뛰어납니다.',
    characteristics: [
      '창조적인 것을 선호, 융통성 있는 도전에 응함',
      '자신의 방식대로 일하는 것을 선호',
      '새로운 것을 시도하거나 타인의 생각을 잡고 늘어짐',
      '사회전문직, 교육, 사회복지, 법학 분야에 적합'
    ]
  },
  Diverging: {
    title: 'Diverging',
    koreanTitle: '확산자',
    description: '이 학습양식에 속하는 사람은 수렴자와 반대되는 강점을 가지며 지배적인 학습능력은 구체적 경험과 반성적 관찰에 있습니다. 이들의 가장 큰 강점은 상상력에 있으며 다각도에서 구체적인 상황을 관찰하는 능력이 뛰어납니다.',
    characteristics: [
      '매사에 긍정적이고, 주변 환경을 편안히 아는 것에 가치를 부여',
      '대화를 통해 다른 사람들로부터 배우는 것을 선호',
      '대안 탐색을 즐기고, 이타주의적임',
      '인문학, 사회과학 분야에 적합'
    ]
  },
  Converging: {
    title: 'Converging',
    koreanTitle: '수렴자',
    description: '이 학습양식에 속하는 사람은 아이디어나 이론을 실제로 적용하는데 뛰어나며, 문제를 해결하는 능력을 소지하고 있습니다. 그리고 이들은 문제의 해결안을 찾아내는데 기초를 두고서 의사결정을 합니다.',
    characteristics: [
      '치밀하고 논리적 사고를 즐김, 분명한 목표와 명확한 일정 선호',
      '직접적인 상황/문제에 관련된 것에 가치 부여',
      '필수적인 정보 수집 및 구성에 능함',
      '과학관련 전문직, 공학, 의학 및 보건학 전문직 분야에 적합'
    ]
  },
  Assimilating: {
    title: 'Assimilating',
    koreanTitle: '순응자',
    description: '이 학습양식에 속하는 학습자의 지배적인 학습능력은 추상적 개념화와 반성적 관찰입니다. 이들은 넓은 영역의 정보를 파악하고 이것을 요약적, 논리적 형태로 만드는 데 뛰어납니다.',
    characteristics: [
      '주제 탐구, 연구, 조사 등을 통한 학습',
      '이론적이며, 난해한 내용을 즐김',
      '과거 경험과 전문가들로부터 더 많이 배운다고 주장',
      '자연과학, 수학 분야에 적합'
    ]
  }
};
