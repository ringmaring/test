// app/report/[institutionId]/page.tsx

async function getReportData(institutionId: string) {
  return {
    institutionName: institutionId.replace('_', ' '),
    totalResponses: 150,
    overallScore: 78,
    scoresByCategory: [
      { category: '기기 편의성', score: 65 },
      { category: '직원 응대', score: 92 },
      { category: '안내 명확성', score: 75 },
    ],
    strengths: ['직원들이 매우 친절하고 적극적으로 도와줌'],
    weaknesses: ['키오스크 글씨가 작고 화면이 복잡하다는 의견 다수'],
  };
}

export default async function ReportPage({ params }: { params: { institutionId: string } }) {
  const data = await getReportData(params.institutionId);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-10">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{data.institutionName}</h1>
          <p className="text-lg text-gray-600">디지털 친화도 평가 보고서</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">종합 평가</h2>
          <div className="flex items-center gap-6">
            <div className={`w-32 h-32 rounded-full flex flex-col justify-center items-center text-white ${getScoreColor(data.overallScore)}`}>
              <span className="text-4xl font-bold">{data.overallScore}</span>
              <span className="text-sm">/ 100점</span>
            </div>
            <div>
              <p className="text-gray-600">총 <span className="font-bold text-blue-600">{data.totalResponses}명</span>의 시니어 사용자가 평가에 참여했습니다.</p>
              <p className="mt-2">
                <strong className="text-green-600">👍 잘했어요:</strong> {data.strengths.join(', ')}
              </p>
              <p className="mt-1">
                <strong className="text-red-600">👎 아쉬워요:</strong> {data.weaknesses.join(', ')}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">세부 항목별 점수</h2>
          <div className="space-y-4">
            {data.scoresByCategory.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm font-medium text-gray-700">{item.score}점</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${getScoreColor(item.score)}`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 text-center text-gray-500 text-sm">
          <p>본 보고서는 시니어들의 실제 경험을 바탕으로 작성되었습니다.</p>
          <p>보고서 발행일: {new Date().toLocaleDateString('ko-KR')}</p>
        </footer>
      </div>
    </div>
  );
}
