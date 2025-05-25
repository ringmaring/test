export const surveyQuestions = [
  {
    id: 1,
    type: 'ICON_CHOICE',
    image: '/images/kiosk.png',
    text: '무인 주문 기계, 사용하기 편하셨나요?',
    choices: [
      { text: '네, 편했어요', value: 'GOOD' },
      { text: '아니요, 불편했어요', value: 'BAD' },
    ],
    followUp: {
      trigger: 'BAD',
      text: '어떤 점이 가장 불편하셨나요?',
      choices: ['글씨가 작아요', '화면이 복잡해요', '시간이 부족해요', '결제가 어려워요'],
    },
  },
  {
    id: 2,
    type: 'ICON_CHOICE',
    image: '/images/staff.png',
    text: '직원이 친절하게 도와주었나요?',
    choices: [
      { text: '네, 친절했어요', value: 'GOOD' },
      { text: '아니요, 불친절했어요', value: 'BAD' },
    ],
  },
  {
    id: 3,
    type: 'TEXT_CHOICE',
    text: '이 가게의 디지털 환경에 점수를 준다면?',
    choices: [
      { text: '최고예요', value: 'GOOD' },
      { text: '보통이에요', value: 'SOSO' },
      { text: '개선이 필요해요', value: 'BAD' },
    ],
  },
];
