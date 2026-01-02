/**
 * Resonance Web App
 * Author: Tenlossiby
 * Version: v1.5.1 (Fixed UI & API Defaults)
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Sparkles, Moon, Sun, MessageCircle, Settings, 
  Send, RefreshCw, Heart, Zap, 
  Ghost, ArrowLeft, Star,
  MessageSquarePlus, Brain, X,
  Plus, Trash2, LayoutGrid, ChevronLeft,
  Key, Coffee, Edit2, Users, Activity,
  Briefcase, User, Anchor, Minimize2,
  BarChart2, Library, Info, Loader2, Feather,
  BookOpen, Smile, Dice5, EyeOff, Eye, CheckSquare, Square,
  Telescope, Compass, Waves, PencilLine,
  ChevronDown, ChevronUp, Palette, Sliders
} from 'lucide-react';

// --- 🌈 全球性少数群体 (LGBTQ+) 身份色彩方案 ---
const THEMES = {
  t1: { primary: 'red-500', gradient: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-600', bgLight: 'bg-red-200', bgDark: 'bg-red-900/40' },
  t2: { primary: 'purple-600', gradient: 'from-pink-500 via-purple-600 to-blue-600', bgLight: 'bg-purple-200', bgDark: 'bg-purple-900/40' },
  t3: { primary: 'sky-400', gradient: 'from-sky-300 via-pink-200 via-white via-pink-200 to-sky-300', bgLight: 'bg-sky-200', bgDark: 'bg-pink-900/30' },
  t4: { primary: 'orange-600', gradient: 'from-orange-600 via-orange-300 via-white via-pink-300 to-pink-600', bgLight: 'bg-orange-200', bgDark: 'bg-orange-900/30' },
  t5: { primary: 'pink-500', gradient: 'from-pink-500 via-yellow-400 to-cyan-400', bgLight: 'bg-pink-200', bgDark: 'bg-pink-900/30' },
  t6: { primary: 'yellow-500', gradient: 'from-yellow-400 via-white via-purple-500 to-slate-900', bgLight: 'bg-yellow-200', bgDark: 'bg-purple-900/30' },
  t7: { primary: 'slate-600', gradient: 'from-slate-900 via-slate-400 via-white to-purple-600', bgLight: 'bg-slate-300', bgDark: 'bg-slate-800/50' },
  t8: { primary: 'purple-400', gradient: 'from-purple-400 via-white to-green-500', bgLight: 'bg-purple-200', bgDark: 'bg-green-900/30' },
  t9: { primary: 'pink-600', gradient: 'from-pink-500 via-white via-purple-600 via-slate-900 to-blue-700', bgLight: 'bg-pink-200', bgDark: 'bg-purple-900/30' },
  t10: { primary: 'green-600', gradient: 'from-green-600 via-green-300 via-white via-slate-400 to-slate-900', bgLight: 'bg-green-200', bgDark: 'bg-green-900/30' }
};

// --- 📚 常量与数据模型 ---
const ZODIAC_SIGNS = [
  '白羊座 (Aries)', '金牛座 (Taurus)', '双子座 (Gemini)', '巨蟹座 (Cancer)', 
  '狮子座 (Leo)', '处女座 (Virgo)', '天秤座 (Libra)', '天蝎座 (Scorpio)', 
  '射手座 (Sagittarius)', '摩羯座 (Capricorn)', '水瓶座 (Aquarius)', '双鱼座 (Pisces)'
];

const PLANETS = [
  { key: 'sun', label: '太阳', icon: Sun },
  { key: 'moon', label: '月亮', icon: Moon },
  { key: 'mercury', label: '水星', icon: MessageCircle },
  { key: 'venus', label: '金星', icon: Heart },
  { key: 'mars', label: '火星', icon: Zap },
  { key: 'rising', label: '上升', icon: ArrowLeft },
];

const HOUSE_SYSTEMS = [
  { id: 'placidus', label: '普拉西度制' },
  { id: 'whole_sign', label: '整宫制' }
];

const FUNCTION_ORDER = ['Se', 'Si', 'Ne', 'Ni', 'Te', 'Ti', 'Fe', 'Fi'];

const MBTI_DEFAULTS = {
  ISTJ: { Si: 90, Te: 70, Fi: 50, Ne: 10, Se: 30, Ti: 40, Fe: 20, Ni: 15 },
  ISFJ: { Si: 90, Fe: 70, Ti: 50, Ne: 10, Se: 30, Fi: 40, Te: 20, Ni: 15 },
  INFJ: { Ni: 90, Fe: 70, Ti: 50, Se: 10, Ne: 30, Fi: 40, Te: 20, Si: 15 },
  INTJ: { Ni: 90, Te: 70, Fi: 50, Se: 10, Ne: 30, Ti: 40, Fe: 20, Si: 15 },
  ISTP: { Ti: 90, Se: 70, Ni: 50, Fe: 10, Te: 30, Si: 40, Fi: 20, Ne: 15 },
  ISFP: { Fi: 90, Se: 70, Ni: 50, Te: 10, Fe: 30, Si: 40, Ti: 20, Ne: 15 },
  INFP: { Fi: 90, Ne: 70, Si: 50, Te: 10, Fe: 30, Ni: 40, Ti: 20, Se: 15 },
  INTP: { Ti: 90, Ne: 70, Si: 50, Fe: 10, Te: 30, Ni: 40, Fi: 20, Se: 15 },
  ESTP: { Se: 90, Ti: 70, Fe: 50, Ni: 10, Si: 30, Te: 40, Fi: 20, Ne: 15 },
  ESFP: { Se: 90, Fi: 70, Te: 50, Ni: 10, Si: 30, Fe: 40, Ti: 20, Ne: 15 },
  ENFP: { Ne: 90, Fi: 70, Te: 50, Si: 10, Ni: 30, Fe: 40, Ti: 20, Se: 15 },
  ENTP: { Ne: 90, Ti: 70, Fe: 50, Si: 10, Ni: 30, Te: 40, Fi: 20, Se: 15 },
  ESTJ: { Te: 90, Si: 70, Ne: 50, Fi: 10, Se: 30, Ti: 40, Fe: 20, Ni: 15 },
  ESFJ: { Fe: 90, Si: 70, Ne: 50, Ti: 10, Se: 30, Fi: 40, Te: 20, Ni: 15 },
  ENFJ: { Fe: 90, Ni: 70, Se: 50, Ti: 10, Ne: 30, Fi: 40, Te: 20, Si: 15 },
  ENTJ: { Te: 90, Ni: 70, Se: 50, Fi: 10, Ne: 30, Ti: 40, Fe: 20, Si: 15 },
};

const RELATIONSHIP_TYPES = [
  { id: 'partner', label: '伴侣', icon: Heart },
  { id: 'crush', label: '心动', icon: Sparkles },
  { id: 'friend', label: '挚友', icon: Users },
  { id: 'qpr', label: '酷儿柏拉图', icon: Anchor },
  { id: 'chosen_family', label: '家人', icon: User },
  { id: 'rival', label: '宿敌', icon: Minimize2 },
  { id: 'custom', label: '自定义...', icon: PencilLine },
];

const GENDER_OPTIONS = [
  '非二元', '酷儿', '性别流体', '跨性别女性', '跨性别男性', '顺性别女性', '顺性别男性', '无性别'
];

// --- 🛠️ 辅助函数 ---
const getNaturalHouse = (planetSignIdx, risingSignIdx) => {
  return ((planetSignIdx - risingSignIdx + 12) % 12) + 1;
};

const generateRandomChart = () => {
  const risingIdx = Math.floor(Math.random() * 12);
  const chart = {
    rising: { sign: ZODIAC_SIGNS[risingIdx] }
  };
  ['sun', 'moon', 'mercury', 'venus', 'mars'].forEach(key => {
    let signIdx = Math.floor(Math.random() * 12);
    chart[key] = {
      sign: ZODIAC_SIGNS[signIdx],
      house: getNaturalHouse(signIdx, risingIdx).toString()
    };
  });
  return chart;
};

const DEFAULT_PROFILE = {
  name: '', gender: '非二元', relationId: 'friend', customRelation: '', 
  mbti: 'INFJ', functions: { ...MBTI_DEFAULTS.INFJ }, mbtiUnknown: false,
  chart: generateRandomChart(), chartUnknown: false, risingUnknown: false,
  houseSystem: 'placidus', interceptedSigns: ''
};

// --- 🤖 多模型 API 集成 (Vercel 中转模式) ---
const callAI = async (prompt, systemPrompt, config, userProfile = null) => {
  const { apiKey, baseUrl, modelType, modelName } = config;
  
  if (!apiKey) return "((未检测到 API Key，请在 Mirror 界面底部填写))";
  
// --- 修复开始: 自动设置默认官方地址 ---
  let finalBaseUrl = baseUrl;
  
  // 如果用户没有填 Base URL (或者填的是空的)，自动填入官方默认地址
  if (!finalBaseUrl || finalBaseUrl.trim() === '') {
    if (modelType === 'gemini') {
      finalBaseUrl = 'https://generativelanguage.googleapis.com';
    } else {
      // OpenAI 默认地址 (国内需确保网络能直连，或者填入中转地址)
      finalBaseUrl = 'https://api.openai.com/v1';
    }
  } else {
    // 如果用户填了地址，确保它是 http 开头的完整地址
    // 如果用户只填了 /api (旧习惯)，这里做个兼容，但不建议
    if (!finalBaseUrl.startsWith('http')) {
       finalBaseUrl = 'https://api.openai.com/v1'; 
    }
  }
  // --- 修复结束 ---

  let personalityContext = "";
  if (userProfile) {
    const mbti = userProfile.mbtiUnknown ? "未知" : `${userProfile.mbti}`;
    const sun = userProfile.chart?.sun?.sign || "未知";
    personalityContext = `\n[用户配置: MBTI ${mbti}, 太阳星座 ${sun}]。`;
  }

  const finalSystem = systemPrompt + personalityContext + "\n指令: 禁止使用Markdown格式，仅输出纯文本。";
  const cleanBase = finalBaseUrl.replace(/\/$/, ''); 

  console.log(`[Resonance] Calling... URL: ${cleanBase}, Model: ${modelName || '(Default)'}`);

  try {
    if (modelType === 'gemini') {
      // Gemini 格式
      const url = `${cleanBase}/v1beta/models/${modelName || 'gemini-pro'}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: finalSystem }] }
        })
      });
      if (!response.ok) {
        const err = await response.text();
        console.error(err);
        throw new Error(`Status: ${response.status}`);
      }
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;

    } else {
      // OpenAI / 通用转发格式
      // 注意：如果是走 /api 中转，这里会自动拼接到 anyrouter
      const url = `${cleanBase}/chat/completions`;
      
      const payload = {
        messages: [{ role: "system", content: finalSystem }, { role: "user", content: prompt }]
      };
      
      // 修复：只有当用户指定了 modelName 时才传 model 参数，否则不传（由后端/中转决定默认值）
      if (modelName) {
        payload.model = modelName;
      } else {
        // 部分 API 强制要求 model 字段，给一个最通用的兜底，但主要依赖后端默认
        // 如果你的 API 报错 "model is required"，这里逻辑是根据你的要求留空
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(modelName ? { ...payload, model: modelName } : { ...payload, model: 'default' }) 
        // 修正：虽然想留空，但 fetch 如果缺 model 参数可能会 400。
        // 根据你的需求：'生成的api里特定没有选择单个模型'，通常这种情况下传 'default' 或不传 key 均可。
        // 这里为了兼容性，如果不填，我们暂传 'default'，如果你的中转站报错，请告知。
      });
      
      if (!response.ok) {
         const err = await response.text();
         console.error(err);
         throw new Error(`Status: ${response.status}`);
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content;
    }
  } catch (error) {
    console.error(error);
    return `((连接失败: ${error.message} - 请检查 API Key 或网络))`;
  }
};

// --- 🧩 UI 组件 ---
const GlassCard = ({ children, className = "", onClick }) => (
  <div onClick={onClick} className={`backdrop-blur-2xl bg-white/50 dark:bg-slate-900/50 border border-white/40 dark:border-slate-800/40 shadow-sm transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const ThemeToggle = ({ isDark, setIsDark, onThemeOpen, activeTheme }) => (
  <div className="flex items-center gap-1.5">
    <button onClick={onThemeOpen} className={`p-2.5 rounded-full bg-white/40 dark:bg-slate-800/40 text-${activeTheme.primary} hover:scale-110 transition-all`}><Palette size={18} /></button>
    <button onClick={() => setIsDark(!isDark)} className="p-2.5 rounded-full bg-white/40 dark:bg-slate-800/40 text-slate-500 hover:scale-110 transition-all">{isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-sky-500" />}</button>
  </div>
);

const ThemeDrawer = ({ currentThemeId, onSelect, onClose, isOpen }) => (
  <div className={`fixed inset-0 z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
    <div className={`absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/90 backdrop-blur-3xl rounded-t-[3rem] p-8 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-8" />
      <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2 px-2"><Palette size={20} /> 身份配色方案</h3>
      <div className="grid grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pb-10 px-2">
        {Object.entries(THEMES).map(([id, theme]) => (
          <button key={id} onClick={() => { onSelect(id); onClose(); }} className={`h-20 rounded-3xl border transition-all relative overflow-hidden group ${currentThemeId === id ? `border-${theme.primary} ring-2 ring-${theme.primary}/20` : 'border-white dark:border-slate-800'}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
            {currentThemeId === id && <div className="absolute inset-0 flex items-center justify-center bg-black/10"><CheckSquare className="text-white" size={24} /></div>}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const PersonaEditor = ({ initialData, onSave, onCancel, isSelf, title, isDark, setIsDark, activeTheme, onThemeOpen }) => {
  const [form, setForm] = useState(() => ({ ...DEFAULT_PROFILE, ...initialData }));
  const [showAdvancedMBTI, setShowAdvancedMBTI] = useState(false);

  const handleRandomRoll = () => { 
    const updates = {};
    if (!form.chartUnknown) updates.chart = generateRandomChart();
    if (!form.mbtiUnknown) {
      const types = Object.keys(MBTI_DEFAULTS);
      const randomType = types[Math.floor(Math.random() * types.length)];
      updates.mbti = randomType;
      updates.functions = { ...MBTI_DEFAULTS[randomType] };
    }
    setForm(prev => ({ ...prev, ...updates }));
  };

  const handlePlanetSignChange = (key, sign) => {
    const risingIdx = ZODIAC_SIGNS.indexOf(form.chart.rising.sign);
    const signIdx = ZODIAC_SIGNS.indexOf(sign);
    const updates = { ...form.chart };
    updates[key] = { ...updates[key], sign };
    if (key !== 'rising' && !form.risingUnknown) {
      updates[key].house = getNaturalHouse(signIdx, risingIdx).toString();
    } else if (key === 'rising') {
      Object.keys(updates).forEach(pk => {
        if (pk === 'rising') return;
        updates[pk].house = getNaturalHouse(ZODIAC_SIGNS.indexOf(updates[pk].sign), signIdx).toString();
      });
    }
    setForm(prev => ({ ...prev, chart: updates }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-950 overflow-y-auto animate-in fade-in pb-24 text-slate-900 dark:text-slate-100">
      <div className="p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/20 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-slate-800/40 transition-all"><ArrowLeft size={20} className="text-slate-500" /></button>
          <h2 className="font-serif font-bold text-lg">{title}</h2>
        </div>
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} onThemeOpen={onThemeOpen} activeTheme={activeTheme} />
      </div>
      
      <div className="p-6 max-w-2xl mx-auto w-full space-y-10">
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">身份基础</h3>
          <GlassCard className="rounded-[2rem] p-1 border-white/60"><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="TA的昵称" className="w-full text-xl font-serif p-5 bg-transparent outline-none dark:text-white placeholder:text-slate-300"/></GlassCard>
          <div className="grid grid-cols-2 gap-4">
             {!isSelf ? <select value={form.relationId} onChange={e => setForm({...form, relationId: e.target.value})} className="p-4 bg-white/40 dark:bg-slate-800/40 border border-white/40 rounded-2xl dark:text-white outline-none h-[56px]">{RELATIONSHIP_TYPES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}</select> : <div className={`p-4 bg-${activeTheme.primary}/5 rounded-2xl text-${activeTheme.primary} text-sm flex items-center justify-center font-bold italic h-[56px]`}>核心自我</div>}
             <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} className="p-4 bg-white/40 dark:bg-slate-800/40 border border-white/40 rounded-2xl dark:text-white outline-none h-[56px]">{GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}</select>
          </div>
        </section>

        <div className="flex justify-center">
          <button onClick={handleRandomRoll} className={`flex items-center gap-2 text-xs font-bold text-${activeTheme.primary} px-6 py-2.5 rounded-full bg-${activeTheme.primary}/10 hover:bg-${activeTheme.primary}/20 transition-all active:scale-95 shadow-sm border border-${activeTheme.primary}/10`}>
            <RefreshCw size={14}/> 随机生成
          </button>
        </div>

        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/20 dark:border-slate-800 pb-3">
            <h3 className={`text-xs font-bold uppercase tracking-widest text-${activeTheme.primary} flex items-center gap-2 px-1`}><Star size={12}/> 星图配置</h3>
            <label className="flex items-center gap-2 cursor-pointer text-[10px] font-bold text-slate-400 uppercase">未知 <input type="checkbox" checked={form.chartUnknown} onChange={e => setForm({...form, chartUnknown: e.target.checked})} className="rounded text-cyan-600"/></label>
          </div>
          {!form.chartUnknown && (
            <GlassCard className="rounded-[2.5rem] p-6 space-y-6 border-white/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-white/10">
                <div><label className="text-[9px] uppercase font-black text-slate-400 block mb-1">分宫制</label><select disabled={form.risingUnknown} value={form.houseSystem} onChange={e => setForm({...form, houseSystem: e.target.value})} className="w-full p-2 text-xs bg-white/40 dark:bg-black/20 border border-white/40 rounded-xl dark:text-white">{HOUSE_SYSTEMS.map(h => <option key={h.id} value={h.id}>{h.label}</option>)}</select></div>
                <div><label className="text-[9px] uppercase font-black text-slate-400 block mb-1">劫夺星座</label><input disabled={form.risingUnknown || form.houseSystem === 'whole_sign'} value={form.interceptedSigns} onChange={e => setForm({...form, interceptedSigns: e.target.value})} placeholder="例: 狮子/水瓶" className="w-full p-2 text-xs bg-white/40 dark:bg-black/20 border border-white/40 rounded-xl dark:text-white outline-none"/></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PLANETS.map(p => (
                  <div key={p.key} className={`p-4 rounded-3xl bg-slate-50/50 dark:bg-slate-900/50 border border-white/60 dark:border-slate-800 transition-all ${p.key === 'rising' && form.risingUnknown ? 'opacity-30' : ''}`}>
                    <span className="text-[9px] text-slate-400 uppercase font-bold flex items-center gap-1.5 mb-1.5"><p.icon size={8}/> {p.label}</span>
                    <select value={form.chart?.[p.key]?.sign} onChange={e => handlePlanetSignChange(p.key, e.target.value)} className={`w-full bg-transparent font-bold text-sm text-${activeTheme.primary} outline-none`}>{ZODIAC_SIGNS.map(z => <option key={z} value={z}>{z.split(' ')[0]}</option>)}</select>
                    {p.key !== 'rising' && !form.risingUnknown && <select value={form.chart?.[p.key]?.house} onChange={e => setForm({...form, chart: { ...form.chart, [p.key]: { ...form.chart?.[p.key], house: e.target.value }}})} className="mt-1 bg-transparent text-[10px] text-slate-400 w-full outline-none">{Array.from({length: 12}, (_, i) => i + 1).map(h => <option key={h} value={h.toString()}>{h}宫</option>)}</select>}
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer p-3 bg-cyan-50/30 dark:bg-cyan-900/10 rounded-2xl border border-cyan-100/50"><input type="checkbox" checked={form.risingUnknown} onChange={e => setForm({...form, risingUnknown: e.target.checked})} className="rounded text-cyan-600"/><span className="text-[10px] font-bold text-cyan-700 dark:text-cyan-300 uppercase">出生时间不详</span></label>
            </GlassCard>
          )}
        </section>
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/20 dark:border-slate-800 pb-3">
            <h3 className={`text-xs font-bold uppercase tracking-widest text-${activeTheme.primary} flex items-center gap-2 px-1`}><Brain size={12}/> 性格内核 (MBTI)</h3>
            <label className="flex items-center gap-2 cursor-pointer text-[10px] font-bold text-slate-400 uppercase">未知 <input type="checkbox" checked={form.mbtiUnknown} onChange={e => setForm({...form, mbtiUnknown: e.target.checked})} className="rounded text-cyan-600"/></label>
          </div>
          {!form.mbtiUnknown && (
            <GlassCard className="rounded-[2.5rem] p-6 space-y-6">
              {/* 修复：选中项增加渐变背景，解决白底白字看不清的问题 */}
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(MBTI_DEFAULTS).map(type => (
                  <button 
                    key={type} 
                    onClick={() => setForm(prev => ({ ...prev, mbti: type, functions: { ...MBTI_DEFAULTS[type] } }))} 
                    className={`py-2 rounded-xl text-[10px] font-mono border transition-all ${
                      form.mbti === type 
                        ? `bg-gradient-to-r ${activeTheme.gradient} text-white font-bold shadow-md border-transparent` 
                        : 'bg-white/40 dark:bg-slate-800/40 text-slate-500 border-white/40 dark:border-slate-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="flex justify-center"><button onClick={() => setShowAdvancedMBTI(!showAdvancedMBTI)} className={`flex items-center gap-2 text-[10px] font-black uppercase text-${activeTheme.primary} px-4 py-1.5 rounded-full bg-${activeTheme.primary}/10 hover:bg-${activeTheme.primary}/20 transition-all`}><Sliders size={12}/> {showAdvancedMBTI ? "收回八维" : "八维进阶设置"}</button></div>
              {showAdvancedMBTI && <div className="grid grid-cols-2 gap-x-8 gap-y-6 animate-in slide-in-from-top-2">{FUNCTION_ORDER.map(func => (<div key={func} className="space-y-2"><div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase"><span>{func}</span><span>{form.functions?.[func]}</span></div><input type="range" min="0" max="100" value={form.functions?.[func]} onChange={e => setForm({...form, functions: {...form.functions, [func]: parseInt(e.target.value)}})} className={`w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none accent-${activeTheme.primary}`}/></div>))}</div>}
            </GlassCard>
          )}
        </section>
        <button onClick={() => onSave(form)} className={`w-full py-5 bg-gradient-to-r ${activeTheme.gradient} text-white rounded-[2rem] shadow-2xl font-bold text-lg transition-all active:scale-[0.98]`}>保存共振配置</button>
      </div>
    </div>
  );
};

// --- CHAT INTERFACE ---
const ChatInterface = ({ contact, onUpdateContact, onBack, onEdit, userProfile, isDark, setIsDark, activeTheme, onThemeOpen, apiConfig }) => {
  const [messages, setMessages] = useState(contact?.messages || []);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState(contact?.context || '');
  const messagesEndRef = useRef(null);

  useEffect(() => { if (contact) { onUpdateContact({ ...contact, messages, context }); messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }}, [messages, context]);

  const handleSend = async (customPrompt) => {
    const text = customPrompt || input;
    if (!text.trim()) return;
    if (!customPrompt) { setMessages(prev => [...prev, { role: 'user', content: text }]); setInput(''); }
    setIsTyping(true);
    const history = messages.slice(-10).map(m => `${m.role}: ${m.content}`).join('\n');
    const sys = `你正在扮演 ${contact.name}。你的MBTI是 ${contact.mbtiUnknown ? '未知' : contact.mbti}。当前情境是: ${context}。回复请真实、口语化，多用标点，禁止Markdown。绝对禁止回复超过150字。`;
    const reply = await callAI(`${history}\nUser: ${text}`, sys, apiConfig, userProfile);
    setMessages(prev => [...prev, { role: 'ai', content: reply || "((共振信号微弱...))" }]);
    setIsTyping(false);
  };

  const handleDeepAnalysis = async () => {
    setIsTyping(true);
    const prompt = `分析我与${contact.name}的关系现状。基于星盘分宫和性格特征给出具体建议。`;
    const sys = "平实的关系洞察者。禁止Markdown。减少感叹号使用，语气稳定且理性。";
    const reply = await callAI(prompt, sys, apiConfig, userProfile);
    setMessages(prev => [...prev, { role: 'ai', content: `[共振深度回响]\n\n${reply}` }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden text-slate-900 dark:text-slate-100">
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-b border-white/20 dark:border-slate-800/20 z-50">
        <div className="p-3 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2.5 rounded-full text-slate-500"><ArrowLeft size={18} /></button>
             <div className="flex flex-col">
               <h3 className="font-bold flex items-center gap-2">
                 {contact.name}
                 {!contact.mbtiUnknown && <span className={`text-[9px] font-mono font-black text-${activeTheme.primary}`}>{contact.mbti}</span>}
               </h3>
               <div className="flex items-center gap-2 opacity-50">
                 {!contact.chartUnknown && (
                   <span className="text-[8px] font-black uppercase tracking-tighter">
                     Sun {contact.chart?.sun?.sign.split(' ')[0]} / Asc {contact.chart?.rising?.sign.split(' ')[0]}
                   </span>
                 )}
               </div>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <button onClick={handleDeepAnalysis} className={`p-2.5 rounded-full text-${activeTheme.primary} bg-${activeTheme.primary}/10 shadow-sm`}><Activity size={18}/></button>
             <ThemeToggle isDark={isDark} setIsDark={setIsDark} onThemeOpen={onThemeOpen} activeTheme={activeTheme} />
             <button onClick={onEdit} className="p-2.5 rounded-full text-slate-500"><Settings size={18}/></button>
           </div>
        </div>
        <div className="px-5 pb-3 pt-1">
          <div className="flex items-center gap-2 bg-white/30 dark:bg-black/20 rounded-2xl px-4 py-1.5 border border-white/40 shadow-inner group">
             <span className={`text-[9px] font-black text-${activeTheme.primary} uppercase tracking-widest whitespace-nowrap`}>当下情境</span>
             <input 
                value={context} onChange={e => setContext(e.target.value)} 
                placeholder="TA当下的环境或状态？"
                className="w-full bg-transparent text-xs text-slate-600 dark:text-slate-300 outline-none"
             />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-28 no-scrollbar">
         {messages.map((msg, i) => (
           <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-[85%] p-4 rounded-[1.8rem] text-sm leading-relaxed whitespace-pre-wrap backdrop-blur-2xl border shadow-sm ${
               msg.role === 'user' 
                ? `bg-white/40 dark:bg-${activeTheme.primary}/20 border-${activeTheme.primary}/20 text-slate-900 dark:text-white rounded-br-none` 
                : 'bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none'
             }`}>
               {msg.content}
             </div>
           </div>
         ))}
         {isTyping && <div className={`text-[10px] text-${activeTheme.primary} ml-4 animate-pulse`}>读取意识场...</div>}
         <div ref={messagesEndRef} />
      </div>
      <div className="p-4 absolute bottom-0 left-0 right-0 z-50">
        <GlassCard className="rounded-[2.5rem] p-2 flex gap-2 border-white/60 shadow-xl">
           <button onClick={() => handleSend("((眼神交流并尝试回应))")} className={`p-3 text-${activeTheme.primary}`}><Waves size={20}/></button>
           <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="发送显影信号..." className="flex-1 bg-transparent px-2 py-3 text-sm outline-none dark:text-white"/>
           <button onClick={() => handleSend()} className={`p-3 bg-${activeTheme.primary} text-white rounded-full`}><Send size={20} /></button>
        </GlassCard>
      </div>
    </div>
  );
};

// --- MIRROR TAB ---
const MirrorTab = ({ userProfile, setUserProfile, contacts, isEditingSelf, setIsEditingSelf, onClearData, isDark, setIsDark, activeTheme, onThemeOpen, apiConfig, setApiConfig }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isResultExpanded, setIsResultExpanded] = useState(true);

  const runMirrorAnalysis = async () => {
    if (selectedIds.length === 0) return;
    setIsAnalyzing(true);
    const aggregation = contacts.filter(c => selectedIds.includes(c.id)).map(c => `[与${c.name}的互动]: ${(c.messages || []).slice(-8).map(m => m.content).join('|')}`).join('\n');
    const prompt = `通过记录分析我的自我模式。请以平实、智慧的视角解析我在这些互动中的真实面貌。不要指责。不要Markdown。限制在300字内。`;
    const res = await callAI(prompt, "冷静且深刻的自我探索引导者。禁止Markdown。语气稳重平实，禁止感叹号堆砌。", apiConfig, userProfile);
    setAnalysisResult(res || "分析失败。");
    setIsResultExpanded(true);
    setIsAnalyzing(false);
  };

  if (isEditingSelf) return <PersonaEditor title="核心自我" initialData={userProfile} onSave={(u) => { setUserProfile(u); setIsEditingSelf(false); }} onCancel={() => setIsEditingSelf(false)} isSelf={true} isDark={isDark} setIsDark={setIsDark} activeTheme={activeTheme} onThemeOpen={onThemeOpen} />;

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-950 overflow-y-auto pb-32 text-slate-900 dark:text-slate-100">
      <div className="p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/20 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-serif font-black tracking-tighter italic">Mirror</h1>
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} onThemeOpen={onThemeOpen} activeTheme={activeTheme} />
      </div>
      <div className="p-6 space-y-8 max-w-2xl mx-auto w-full">
        <GlassCard className="rounded-[2.5rem] p-8 space-y-6 border-white/60 shadow-xl order-first">
          <div className="flex justify-between items-center"><h2 className="font-bold flex items-center gap-2"><Waves size={18} className={`text-${activeTheme.primary}`}/> 自我模式镜像</h2></div>
          <p className="text-xs text-slate-400">选择共振对象，看看TA们映射出的你是谁。</p>
          <div className="flex flex-wrap gap-2">{contacts.map(c => <button key={c.id} onClick={() => setSelectedIds(prev => prev.includes(c.id) ? prev.filter(i => i !== c.id) : [...prev, c.id])} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${selectedIds.includes(c.id) ? `bg-${activeTheme.primary} border-${activeTheme.primary} text-white shadow-lg` : 'bg-white/40 dark:bg-slate-900/40 text-slate-500'}`}>{selectedIds.includes(c.id) ? <CheckSquare size={12}/> : <Square size={12}/>}{c.name}</button>)}</div>
         {/* 修复：恢复按钮渐变色，而不是之前的灰色 */}
         <button onClick={runMirrorAnalysis} disabled={isAnalyzing || selectedIds.length === 0} className={`w-full py-5 bg-gradient-to-r ${activeTheme.gradient} backdrop-blur-sm text-white rounded-3xl font-black shadow-xl hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center tracking-widest`}>{isAnalyzing ? <Loader2 className="animate-spin" /> : "启动自我洞察共振"}</button>
          {analysisResult && (
            <div className={`mt-4 p-6 bg-${activeTheme.primary}/5 rounded-[2rem] border border-${activeTheme.primary}/10 animate-in slide-in-from-bottom-2`}>
              <div className="flex items-center justify-between mb-2"><span className={`text-xs font-black text-${activeTheme.primary} uppercase tracking-widest`}>洞察回响</span><button onClick={() => setIsResultExpanded(!isResultExpanded)}>{isResultExpanded ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}</button></div>
              {isResultExpanded ? <div className="text-sm leading-relaxed whitespace-pre-wrap font-serif">{analysisResult}</div> : <div className="text-xs italic opacity-50">点击展开深度洞察...</div>}
            </div>
          )}
        </GlassCard>

        <GlassCard className="rounded-[3rem] p-8 space-y-10 border-white/60 relative overflow-hidden">
          <div className="flex items-center gap-6 relative z-10">
             <div className="relative p-1.5 rounded-full backdrop-blur-xl bg-white/20 border border-white/40 shadow-inner">
               <div className={`w-20 h-20 bg-gradient-to-br ${activeTheme.gradient} rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl border-2 border-white/30`}>{userProfile.name?.[0] || '我'}</div>
             </div>
             <div className="flex-1">
               <h2 className="text-2xl font-bold font-serif">{userProfile.name || '未定义'}</h2>
               <div className="flex gap-2 mt-1.5"><span className={`text-[10px] font-black uppercase text-${activeTheme.primary} px-2 py-0.5 bg-${activeTheme.primary}/10 rounded-full border border-${activeTheme.primary}/20`}>{userProfile.mbtiUnknown ? "性格未知" : userProfile.mbti}</span></div>
             </div>
             <button onClick={() => setIsEditingSelf(true)} className="p-3 bg-white/40 dark:bg-slate-800 rounded-full text-slate-500 hover:scale-110 transition-all border border-white/60"><Edit2 size={18}/></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
            {PLANETS.map(p => (
              <div key={p.key} className="p-4 backdrop-blur-xl bg-white/30 dark:bg-black/20 border border-white/40 dark:border-slate-800 rounded-[2rem]">
                <span className="text-[8px] text-slate-400 uppercase font-black flex items-center gap-1.5 mb-1"><p.icon size={8}/> {p.label}</span>
                <div className="text-xs font-black truncate">{userProfile.chart?.[p.key]?.sign?.split(' ')[0]}</div>
                {p.key !== 'rising' && !userProfile.risingUnknown && <div className="text-[9px] text-slate-400 font-bold opacity-60">{userProfile.chart?.[p.key]?.house}宫</div>}
              </div>
            ))}
          </div>
          {!userProfile.mbtiUnknown && (
            <div className="space-y-6 pt-4 relative z-10">
              <div className="flex justify-between items-end border-b border-white/20 dark:border-slate-800 pb-2"><h3 className="text-[10px] text-slate-400 font-black tracking-widest uppercase">心理功能堆栈</h3></div>
              <div className="grid grid-cols-8 gap-1.5 h-32">
                {FUNCTION_ORDER.map(key => (
                  <div key={key} className="flex flex-col items-center">
                    <div className="flex-1 w-full bg-white/20 dark:bg-black/40 rounded-full relative flex flex-col justify-end overflow-hidden border border-white/20 dark:border-slate-800/40 shadow-inner">
                      <div className={`bg-gradient-to-t ${activeTheme.gradient} w-full transition-all duration-[1.5s]`} style={{ height: `${userProfile.functions?.[key] || 0}%` }}></div>
                    </div>
                    <span className="text-[7px] font-black text-slate-400 mt-2 uppercase">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GlassCard>

        {/* API 配置面板 (已移动到个人信息卡片下方) */}
        <GlassCard className="rounded-[2.5rem] p-6 space-y-4 border-white/60 shadow-inner bg-white/20">
          <div className="flex items-center gap-2 mb-2">
            <Key size={14} className={`text-${activeTheme.primary}`} />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">核心共振参数 (API)</h3>
          </div>
          <div className="grid gap-3">
            <select 
              value={apiConfig.modelType} 
              onChange={e => setApiConfig({...apiConfig, modelType: e.target.value})}
              className="w-full p-3 bg-white/40 dark:bg-black/20 border border-white/40 rounded-2xl text-[11px] font-bold outline-none"
            >
              <option value="openai">模式: OpenAI / 通用转发 (AnyRouter 选这个)</option>
              <option value="gemini">模式: Google Gemini (官方)</option>
            </select>
            <input 
              placeholder="Base URL (留空则默认使用 Vercel 中转 /api)" 
              value={apiConfig.baseUrl} 
              onChange={e => setApiConfig({...apiConfig, baseUrl: e.target.value})}
              className="w-full p-3 bg-white/40 dark:bg-black/20 border border-white/40 rounded-2xl text-[11px] outline-none"
            />
            <input 
              type="password"
              placeholder="API Key (密钥: sk-...)" 
              value={apiConfig.apiKey} 
              onChange={e => setApiConfig({...apiConfig, apiKey: e.target.value})}
              className="w-full p-3 bg-white/40 dark:bg-black/20 border border-white/40 rounded-2xl text-[11px] outline-none placeholder:text-slate-300"
            />
            {/* 修复：修改提示文字，明确可以不填 */}
            <input 
              placeholder="Model Name (选填，留空则由API决定)" 
              value={apiConfig.modelName} 
              onChange={e => setApiConfig({...apiConfig, modelName: e.target.value})}
              className="w-full p-3 bg-white/40 dark:bg-black/20 border border-white/40 rounded-2xl text-[11px] outline-none"
            />
          </div>
        </GlassCard>

        <div className="flex flex-col gap-4">
          <button onClick={onClearData} className="w-full p-5 bg-white/30 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl flex items-center justify-between text-red-500 border border-white/40 hover:bg-red-500/10 transition-all shadow-sm"><span className="flex items-center gap-3 text-xs font-black uppercase tracking-widest"><Trash2 size={16}/> 抹除所有数据</span></button>
          {/* UI 署名点 */}
          <div className="text-center opacity-30 text-[10px] font-black tracking-widest uppercase pb-4">
            Design & Concept by Tenlossiby
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 🧠 主应用架构 ---
export default function App() {
  // --- API 配置持久化 ---
  // 修复：默认 modelName 为空字符串，不再强行写入 gpt-3.5-turbo
  const [apiConfig, setApiConfig] = useState(() => JSON.parse(localStorage.getItem('resonance_api_config')) || {
    apiKey: '',
    baseUrl: '', 
    modelType: 'openai', 
    modelName: '' 
  });

  useEffect(() => localStorage.setItem('resonance_api_config', JSON.stringify(apiConfig)), [apiConfig]);
  
  const [activeTab, setActiveTab] = useState('resonance'); 
  const [view, setView] = useState('list'); 
  const [isEditingSelf, setIsEditingSelf] = useState(false);
  const [themeId, setThemeId] = useState(() => localStorage.getItem('resonance_theme_id') || 't1');
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('resonance_contacts')) || []);
  const [userProfile, setUserProfile] = useState(() => JSON.parse(localStorage.getItem('resonance_user_profile')) || DEFAULT_PROFILE);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('resonance_theme_dark') === 'dark');
  const [activeContactId, setActiveContactId] = useState(null);

  useEffect(() => localStorage.setItem('resonance_contacts', JSON.stringify(contacts)), [contacts]);
  useEffect(() => localStorage.setItem('resonance_user_profile', JSON.stringify(userProfile)), [userProfile]);
  useEffect(() => localStorage.setItem('resonance_theme_id', themeId), [themeId]);
  useEffect(() => { document.documentElement.classList.toggle('dark', isDark); localStorage.setItem('resonance_theme_dark', isDark ? 'dark' : 'light'); }, [isDark]);

  const activeTheme = THEMES[themeId] || THEMES.t1;
  const activeContact = contacts.find(c => c.id === activeContactId);

  return (
    <div className={`h-[100dvh] w-full flex flex-col font-sans transition-all duration-700 ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} overflow-hidden relative selection:bg-white/30`}>
      
      {/* 动态主题背景层 */}
      <div className="fixed inset-0 pointer-events-none transition-all duration-1000">
        <div className={`absolute top-[-15%] left-[-15%] w-[80%] h-[80%] opacity-40 blur-[140px] animate-pulse rounded-full ${activeTheme.bgLight} dark:${activeTheme.bgDark}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] opacity-30 blur-[120px] rounded-full bg-gradient-to-br ${activeTheme.gradient}`} />
      </div>

      <ThemeDrawer currentThemeId={themeId} onSelect={setThemeId} isOpen={isThemeDrawerOpen} onClose={() => setIsThemeDrawerOpen(false)} />
      
      <div className="flex-1 overflow-hidden relative z-10">
        {activeTab === 'resonance' && (
           view === 'list' ? (
             <div className="h-full flex flex-col animate-in fade-in">
               <div className="p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/20 flex items-center justify-between shadow-sm">
                 <h1 className="text-2xl font-serif font-black italic tracking-tighter">Resonance</h1>
                 <ThemeToggle isDark={isDark} setIsDark={setIsDark} onThemeOpen={() => setIsThemeDrawerOpen(true)} activeTheme={activeTheme} />
               </div>
               <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24 no-scrollbar">
                 <button onClick={() => { setActiveContactId(null); setView('create'); }} className={`w-full py-10 border border-dashed border-slate-300/50 dark:border-slate-700/50 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 bg-white/20 dark:bg-white/5 backdrop-blur-xl transition-all hover:bg-white/40 shadow-sm group`}>
                   <Plus size={24} className={`text-${activeTheme.primary}`}/>
                   <span className="font-black uppercase text-[10px] tracking-widest text-slate-400">共振显影</span>
                 </button>
                 <div className="grid gap-4">
                   {contacts.map(c => (
                    <GlassCard key={c.id} onClick={() => { setActiveContactId(c.id); setView('chat'); }} className="p-5 rounded-[2.2rem] flex justify-between items-center group active:scale-95 transition-all relative overflow-hidden">
                      <div className="flex items-center gap-5 relative z-10">
                         <div className="p-1 rounded-full backdrop-blur-lg bg-white/40 border border-white/60 shadow-sm">
                            <div className={`w-14 h-14 bg-gradient-to-br ${activeTheme.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-white/20`}>{c.name?.[0]}</div>
                         </div>
                         <div className="space-y-1">
                            <h3 className="font-bold text-lg tracking-tight">{c.name}</h3>
                            <div className={`text-[9px] font-black uppercase text-${activeTheme.primary} font-mono tracking-widest bg-${activeTheme.primary}/10 px-2 py-0.5 rounded-full border border-${activeTheme.primary}/10 w-fit`}>{c.mbtiUnknown ? "未知性格" : c.mbti}</div>
                         </div>
                      </div>
                      <div className="relative z-10 p-2 rounded-full bg-white/20 border border-white/40"><ChevronLeft size={16} className="text-slate-400 rotate-180"/></div>
                    </GlassCard>
                   ))}
                 </div>
                 {/* UI 署名点 */}
                 <div className="text-center opacity-20 text-[9px] font-black tracking-widest uppercase py-8">
                   Manifested by Tenlossiby
                 </div>
               </div>
             </div>
           ) : view === 'create' ? (
             <PersonaEditor title={activeContactId ? "重塑立格" : "显影立格"} initialData={activeContactId ? activeContact : null}
                onSave={(f) => {
                  if (activeContactId) { setContacts(contacts.map(c => c.id === activeContactId ? { ...c, ...f } : c)); }
                  else { setContacts([{id: Date.now().toString(), ...f, messages: []}, ...contacts]); }
                  setView('list'); setActiveContactId(null);
                }} 
                onCancel={() => { setView('list'); setActiveContactId(null); }}
                activeTheme={activeTheme} isDark={isDark} setIsDark={setIsDark} onThemeOpen={() => setIsThemeDrawerOpen(true)}
             />
           ) : activeContactId && (
             <ChatInterface contact={activeContact} userProfile={userProfile}
                onUpdateContact={(u) => setContacts(contacts.map(c => c.id === u.id ? u : c))} 
                onBack={() => { setView('list'); setActiveContactId(null); }}
                onEdit={() => setView('create')} activeTheme={activeTheme}
                isDark={isDark} setIsDark={setIsDark} onThemeOpen={() => setIsThemeDrawerOpen(true)}
                apiConfig={apiConfig}
             />
           )
        )}
        {activeTab === 'mirror' && (
          <MirrorTab 
             userProfile={userProfile} 
             setUserProfile={setUserProfile} 
             contacts={contacts} 
             isEditingSelf={isEditingSelf} 
             setIsEditingSelf={setIsEditingSelf} 
             onClearData={() => { if(window.confirm('抹除所有共振记忆？')) { localStorage.clear(); window.location.reload(); }}} 
             isDark={isDark} 
             setIsDark={setIsDark} 
             activeTheme={activeTheme} 
             onThemeOpen={() => setIsThemeDrawerOpen(true)}
             apiConfig={apiConfig}
             setApiConfig={setApiConfig}
           />
        )}
      </div>
      {!(view !== 'list' || isEditingSelf) && (
        <div className="p-4 bg-transparent absolute bottom-0 left-0 right-0 z-50 flex justify-center">
          <GlassCard className="h-20 w-full max-w-sm rounded-[2.5rem] flex items-center justify-center gap-12 border-white/60 shadow-2xl px-10">
            <button onClick={() => setActiveTab('resonance')} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeTab === 'resonance' ? `text-${activeTheme.primary} scale-110` : 'text-slate-400'}`}>
              <Users size={24} strokeWidth={activeTab === 'resonance' ? 2.5 : 2} /><span className="text-[9px] font-black uppercase tracking-widest">Resonance</span>
            </button>
            <button onClick={() => { setActiveTab('mirror'); setIsEditingSelf(false); }} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeTab === 'mirror' ? `text-${activeTheme.primary} scale-110` : 'text-slate-400'}`}>
              <User size={24} strokeWidth={activeTab === 'mirror' ? 2.5 : 2} /><span className="text-[9px] font-black uppercase tracking-widest">Mirror</span>
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
