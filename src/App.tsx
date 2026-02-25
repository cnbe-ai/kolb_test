/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardCheck, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Info,
  ChevronRight,
  Target,
  Eye,
  Brain,
  Zap
} from 'lucide-react';
import { 
  QUESTIONS, 
  STYLE_DESCRIPTIONS, 
  Question, 
  Answers, 
  LearningStyle 
} from './constants';

type AppState = 'intro' | 'test' | 'results';

export default function App() {
  const [state, setState] = useState<AppState>('intro');
  const [answers, setAnswers] = useState<Answers[]>(
    Array(QUESTIONS.length).fill({ CE: 0, RO: 0, AC: 0, AE: 0 })
  );

  const isValid = useMemo(() => {
    return answers.map(ans => {
      const values = [ans.CE, ans.RO, ans.AC, ans.AE].filter(v => v > 0);
      const uniqueValues = new Set(values);
      return values.length === 4 && uniqueValues.size === 4 && [1, 2, 3, 4].every(v => values.includes(v));
    });
  }, [answers]);

  const allValid = isValid.every(v => v);

  const handleAnswerChange = (qIndex: number, type: keyof Answers, value: string) => {
    const numValue = value ? parseInt(value) : 0;
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[qIndex] = { ...newAnswers[qIndex], [type]: numValue };
      return newAnswers;
    });
  };

  const results = useMemo(() => {
    if (state !== 'results') return null;

    const totalScores = answers.reduce(
      (acc, curr) => ({
        CE: acc.CE + curr.CE,
        RO: acc.RO + curr.RO,
        AC: acc.AC + curr.AC,
        AE: acc.AE + curr.AE,
      }),
      { CE: 0, RO: 0, AC: 0, AE: 0 }
    );

    const axisScores = {
      AERO: totalScores.AE - totalScores.RO,
      ACCE: totalScores.AC - totalScores.CE,
    };

    let style: LearningStyle;
    if (axisScores.AERO >= 0 && axisScores.ACCE >= 0) style = 'Converging';
    else if (axisScores.AERO >= 0 && axisScores.ACCE < 0) style = 'Accommodating';
    else if (axisScores.AERO < 0 && axisScores.ACCE >= 0) style = 'Assimilating';
    else style = 'Diverging';

    return { totalScores, axisScores, style };
  }, [state, answers]);

  const reset = () => {
    setAnswers(Array(QUESTIONS.length).fill({ CE: 0, RO: 0, AC: 0, AE: 0 }));
    setState('intro');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {state === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-2">
                <ClipboardCheck size={32} />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-serif italic">
                콜브 학습양식 진단검사
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                경험 학습 이론에 기반하여 당신의 고유한 학습 스타일을 발견해보세요.
              </p>
            </div>

            <div className="card space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Info size={20} className="text-indigo-500" />
                검사 안내
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>이 검사는 총 12개의 문항으로 구성되어 있습니다.</p>
                <p>각 문항마다 4가지 선택지가 있으며, 자신을 가장 잘 나타낸다고 생각하는 항목부터 <strong>4, 3, 2, 1점</strong>으로 점수를 배정하세요.</p>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                  <p className="text-sm text-amber-800 font-medium">
                    중요: 한 문항 내에서 같은 점수를 중복해서 사용할 수 없습니다.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-medium mb-3">예시: 학습할 때 나는</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <span>직관적인 사람이다.</span>
                    <span className="font-mono bg-white px-2 py-1 rounded border border-slate-200">1점 (가장 낮음)</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>관찰적인 사람이다.</span>
                    <span className="font-mono bg-white px-2 py-1 rounded border border-slate-200">4점 (가장 높음)</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>논리적인 사람이다.</span>
                    <span className="font-mono bg-white px-2 py-1 rounded border border-slate-200">3점</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>활동적인 사람이다.</span>
                    <span className="font-mono bg-white px-2 py-1 rounded border border-slate-200">2점</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setState('test')}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                검사 시작하기 <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {state === 'test' && (
          <motion.div
            key="test"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between sticky top-4 z-10 glass p-4 rounded-2xl">
              <h2 className="text-lg font-bold text-indigo-600">진단 진행 중</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500">
                  {isValid.filter(v => v).length} / {QUESTIONS.length} 완료
                </span>
                <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(isValid.filter(v => v).length / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {QUESTIONS.map((q, qIdx) => (
                <div 
                  key={q.id} 
                  className={`card transition-all duration-300 ${isValid[qIdx] ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200'}`}
                >
                  <div className="flex items-start gap-3 mb-6">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      {q.id}
                    </span>
                    <h3 className="text-lg font-semibold pt-0.5">{q.question}</h3>
                  </div>

                  <div className="space-y-4">
                    {(Object.entries(q.options) as [keyof Answers, string][]).map(([type, text]) => (
                      <div key={type} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <span className="text-slate-700 text-sm sm:text-base">{text}</span>
                        <select
                          value={answers[qIdx][type] || ''}
                          onChange={(e) => handleAnswerChange(qIdx, type, e.target.value)}
                          className="w-full sm:w-24 p-2 rounded-lg border border-slate-200 bg-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                          <option value="">선택</option>
                          <option value="1">1점</option>
                          <option value="2">2점</option>
                          <option value="3">3점</option>
                          <option value="4">4점</option>
                        </select>
                      </div>
                    ))}
                  </div>

                  {!isValid[qIdx] && (Object.values(answers[qIdx]) as number[]).some(v => v > 0) && (
                    <div className="mt-4 flex items-center gap-2 text-rose-500 text-xs font-medium">
                      <AlertCircle size={14} />
                      <span>각 항목에 1~4점을 중복 없이 배정해주세요.</span>
                    </div>
                  )}
                  {isValid[qIdx] && (
                    <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-medium">
                      <CheckCircle2 size={14} />
                      <span>완료되었습니다.</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="card sticky bottom-4 z-10 glass">
              <button
                disabled={!allValid}
                onClick={() => setState('results')}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                결과 확인하기 <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {state === 'results' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-slate-900">진단 결과</h1>
              <p className="text-slate-500">당신의 학습 스타일을 분석했습니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Target size={20} className="text-indigo-500" />
                  학습 유형
                </h2>
                <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
                  <span className="text-sm font-bold text-indigo-500 uppercase tracking-widest">
                    {STYLE_DESCRIPTIONS[results.style].title}
                  </span>
                  <h3 className="text-4xl font-black text-indigo-900 mt-1">
                    {STYLE_DESCRIPTIONS[results.style].koreanTitle}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {STYLE_DESCRIPTIONS[results.style].description}
                </p>
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wider">주요 특징</h4>
                  <ul className="space-y-2">
                    {STYLE_DESCRIPTIONS[results.style].characteristics.map((char, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Info size={20} className="text-indigo-500" />
                  학습 유형 안내도
                </h2>
                <div className="relative aspect-square w-full max-w-[300px] mx-auto border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
                  {/* Grid Lines */}
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-300 -translate-y-1/2" />
                  <div className="absolute top-0 left-1/2 w-0.5 h-full bg-slate-300 -translate-x-1/2" />
                  
                  {/* Labels */}
                  <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-400">순응자</div>
                  <div className="absolute top-4 left-4 text-[10px] font-bold text-slate-400">확산자</div>
                  <div className="absolute bottom-4 left-4 text-[10px] font-bold text-slate-400">조정자</div>
                  <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-400">수렴자</div>

                  {/* Axis Labels */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-indigo-500">AC (+)</div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-indigo-500">CE (-)</div>
                  <div className="absolute top-1/2 right-1 -translate-y-1/2 text-[10px] font-bold text-indigo-500">AE (+)</div>
                  <div className="absolute top-1/2 left-1 -translate-y-1/2 text-[10px] font-bold text-indigo-500">RO (-)</div>

                  {/* Result Point */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-lg z-10"
                    style={{
                      left: `${50 + (results.axisScores.AERO / 48) * 50}%`,
                      top: `${50 - (results.axisScores.ACCE / 48) * 50}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">AE - RO (X축)</div>
                    <div className="text-xl font-bold text-indigo-600">{results.axisScores.AERO}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">AC - CE (Y축)</div>
                    <div className="text-xl font-bold text-indigo-600">{results.axisScores.ACCE}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-bold mb-6">상세 점수</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: '구체적 경험 (CE)', score: results.totalScores.CE, icon: <Zap size={16} />, color: 'text-rose-500' },
                  { label: '반성적 관찰 (RO)', score: results.totalScores.RO, icon: <Eye size={16} />, color: 'text-amber-500' },
                  { label: '추상적 개념화 (AC)', score: results.totalScores.AC, icon: <Brain size={16} />, color: 'text-blue-500' },
                  { label: '능동적 실험 (AE)', score: results.totalScores.AE, icon: <Target size={16} />, color: 'text-emerald-500' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${item.color}`}>
                      {item.icon} {item.label.split(' ')[0]}
                    </div>
                    <div className="text-2xl font-black text-slate-900">{item.score}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{item.label.split('(')[1].replace(')', '')}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full py-4 flex items-center justify-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors"
            >
              <RotateCcw size={18} /> 다시 검사하기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
