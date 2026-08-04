import { brand } from "@/config/brand";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-2xl font-bold tracking-tight text-blue-600">
              {brand.name}
            </p>
            <p className="text-xs text-slate-500">{brand.description}</p>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#questions" className="hover:text-blue-600">
              질문 둘러보기
            </a>
            <a href="#experts" className="hover:text-blue-600">
              전문가
            </a>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              질문하기
            </button>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-5 py-24 text-center">
        <span className="mb-5 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          사용자와 전문가가 함께 만드는 수리 커뮤니티
        </span>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          어떤 제품이 고장 났나요?
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {brand.slogan}
        </p>

        <div className="mt-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
          <input
            type="search"
            placeholder="제품명, 모델명 또는 증상을 검색하세요"
            className="min-h-14 flex-1 rounded-xl border border-slate-300 bg-white px-5 text-base outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <button className="min-h-14 rounded-xl bg-blue-600 px-7 font-semibold text-white hover:bg-blue-700">
            검색
          </button>
        </div>

        <button className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700">
          찾는 내용이 없다면 질문을 등록하세요 →
        </button>
      </section>
    </main>
  );
}
