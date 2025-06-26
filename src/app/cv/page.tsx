const CVPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">李俊霖</h1>
        <p className="mt-4 text-xl text-gray-600">模拟与射频集成电路设计</p>
      </header>

      <div className="prose prose-lg max-w-none text-justify mb-12 space-y-4">
        <p>我是一名来自中国科学技术大学的硕士研究生，专注于模拟与射频集成电路设计。目前的研究方向聚焦于高性能振荡器、放大器以及毫米波雷达接收机前端模块。在校期间参与了多项基于 TSMC N22 工艺的芯片设计与流片项目，具备从电路架构搭建、版图协同设计到后期测试验证的完整经验。</p>
        <p>我的工作目标是设计具有优异性能的模拟/射频模块，同时兼顾芯片级集成的可实现性。对每一次 tape-out，我都保持审慎与责任感。</p>
      </div>

      <Section title="研究方向">
        <ul className="list-disc pl-5 space-y-1">
          <li>模拟与射频集成电路设计（Analog/RF IC）</li>
          <li>振荡器架构、调tuning与相位噪声优化</li>
          <li>TIA / VGA / PGA 等基带放大器设计</li>
          <li>毫米波雷达系统芯片（77GHz MIMO SoC）</li>
        </ul>
      </Section>

      <Section title="教育背景">
        <Experience
          title="中国科学技术大学"
          subtitle="硕士研究生，集成电路设计与系统"
          date="2023 – 2026"
          details={[
            "导师：胡诣哲 教授",
            "主修方向：模拟/射频IC、高性能振荡器、基带信号链设计",
            "奖学金：2023年、2024年一等学业奖学金",
          ]}
        />
        <Experience
          title="中国科学技术大学"
          subtitle="本科，仪器科学与技术"
          date="2019 – 2023"
          details={[
            "奖学金：2021年、2022年优秀学生奖学金铜奖",
          ]}
        />
      </Section>

      <Section title="技术能力">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>EDA 工具</strong>：熟练使用 Cadence Virtuoso、Calibre、EMX 等进行电路设计与物理验证</li>
          <li><strong>芯片项目经验</strong>：三次 TSMC N22 工艺流片，主导或参与设计了 DCO、TIA、PGA、输出缓冲器等模块</li>
          <li><strong>仿真与测试</strong>：掌握前后仿真流程及相关指标分析，具备使用相位噪声分析仪、频谱仪等进行芯片测试的经验</li>
          <li><strong>其他工具</strong>：Matlab（建模与仿真）、LaTeX（论文与文档排版）</li>
        </ul>
      </Section>

      <footer className="mt-12 pt-8 border-t text-center text-gray-600">
        <p className="mb-2">如需了解更多项目信息，或就模拟IC设计相关问题交流，欢迎通过邮箱联系：</p>
        <a href="mailto:lizi371@mail.ustc.edu.cn" className="text-blue-600 hover:underline font-semibold">
          lizi371@mail.ustc.edu.cn
        </a>
      </footer>
    </div>
  );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4">{title}</h2>
    <div className="prose prose-gray max-w-none">
      {children}
    </div>
  </section>
);

const Experience = ({ title, subtitle, date, details }: { title: string, subtitle: string, date: string, details: string[] }) => (
  <div className="mb-6">
    <div className="flex justify-between items-baseline">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="text-sm text-gray-600 font-medium">{date}</span>
    </div>
    <p className="text-md text-gray-700 mb-2">{subtitle}</p>
    <ul className="list-disc list-inside space-y-1 pl-2">
      {details.map((detail, index) => <li key={index}>{detail}</li>)}
    </ul>
  </div>
);

export default CVPage; 