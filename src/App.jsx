import React, { useState, useEffect, useRef } from 'react';
import { 
    Sparkles, Moon, Sun, MessageCircle, Settings, 
    Send, RefreshCw, Heart, Zap, ArrowLeft, Star,
    Brain, Plus, Trash2, ChevronLeft,
    Key, Edit2, Users, Activity, User, Anchor, Minimize2,
    Loader2, CheckSquare, Square,
    Waves, PencilLine, ChevronDown, ChevronUp, Palette, Sliders, Download,
    BookOpen, X, ExternalLink
} from 'lucide-react';

// --- 常量定义 ---
const THEMES = {
    t1: { primary: 'red-500', gradient: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-600', bgLight: 'bg-red-200', bgDark: 'bg-red-900/10' },
    t2: { primary: 'purple-600', gradient: 'from-pink-500 via-purple-600 to-blue-600', bgLight: 'bg-purple-200', bgDark: 'bg-purple-900/10' },
    t3: { primary: 'sky-400', gradient: 'from-sky-300 via-pink-200 via-white via-pink-200 to-sky-300', bgLight: 'bg-sky-200', bgDark: 'bg-sky-900/10' },
    t4: { primary: 'orange-600', gradient: 'from-orange-600 via-orange-300 via-white via-pink-300 to-pink-600', bgLight: 'bg-orange-200', bgDark: 'bg-orange-900/10' },
    t5: { primary: 'pink-500', gradient: 'from-pink-500 via-yellow-400 to-cyan-400', bgLight: 'bg-pink-200', bgDark: 'bg-pink-900/10' },
    t6: { primary: 'yellow-500', gradient: 'from-yellow-400 via-white via-purple-500 to-slate-900', bgLight: 'bg-yellow-200', bgDark: 'bg-yellow-900/10' },
    t7: { primary: 'slate-600', gradient: 'from-slate-900 via-slate-400 via-white to-purple-600', bgLight: 'bg-slate-300', bgDark: 'bg-slate-900/20' },
    t8: { primary: 'purple-400', gradient: 'from-purple-400 via-white to-green-500', bgLight: 'bg-purple-200', bgDark: 'bg-green-900/10' },
    t9: { primary: 'pink-600', gradient: 'from-pink-500 via-white via-purple-600 via-slate-900 to-blue-700', bgLight: 'bg-pink-200', bgDark: 'bg-purple-900/10' },
    t10: { primary: 'green-600', gradient: 'from-green-600 via-green-300 via-white via-slate-400 to-slate-900', bgLight: 'bg-green-200', bgDark: 'bg-green-900/10' }
};

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
    { id: 'custom', label: '自定义', icon: PencilLine },
];

const GENDER_OPTIONS = [
    '非二元', '酷儿', '性别流体', '跨性别女性', '跨性别男性', '顺性别女性', '顺性别男性', '无性别'
];

// --- 辅助函数 ---
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

const exportToTxt = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const DEFAULT_PROFILE = {
    name: '', 
    gender: '非二元', 
    pronoun: 'Ta',
    relations: ['friend'],
    customRelation: '', 
    mbti: 'INFJ', functions: { ...MBTI_DEFAULTS.INFJ }, mbtiUnknown: false,
    chart: generateRandomChart(), chartUnknown: false, risingUnknown: false,
    houseSystem: 'placidus', interceptedSigns: ''
};

const callAI = async (prompt, systemPrompt, config, userProfile = null) => {
    const { apiKey, baseUrl, modelType, modelName } = config;
    
    if (!apiKey) return "((未检测到 API Key，请在 Mirror 界面底部查看使用指南))";
    
    let finalBaseUrl = baseUrl;
    if (!finalBaseUrl || finalBaseUrl.trim() === '') {
        if (modelType === 'gemini') {
            finalBaseUrl = 'https://generativelanguage.googleapis.com';
        } else {
            finalBaseUrl = 'https://api.openai.com/v1';
        }
    } else {
        if (!finalBaseUrl.startsWith('http')) {
            finalBaseUrl = 'https://api.openai.com/v1'; 
        }
    }

    let personalityContext = "";
    if (userProfile) {
        const mbti = userProfile.mbtiUnknown ? "未知" : `${userProfile.mbti}`;
        const sun = userProfile.chart?.sun?.sign || "未知";
        personalityContext = `\n[用户配置: MBTI ${mbti}, 太阳星座 ${sun}]。`;
    }

    const finalSystem = systemPrompt + personalityContext + "\n指令: 禁止使用Markdown格式，仅输出纯文本。";
    const cleanBase = finalBaseUrl.replace(/\/$/, ''); 

    try {
        if (modelType === 'gemini') {
            const url = `${cleanBase}/v1beta/models/${modelName || 'gemini-2.5-flash'}:generateContent?key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    systemInstruction: { parts: [{ text: finalSystem }] }
                })
            });
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text;
        } else {
            const url = `${cleanBase}/chat/completions`;
            const payload = {
                messages: [{ role: "system", content: finalSystem }, { role: "user", content: prompt }]
            };
            if (modelName) payload.model = modelName;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(modelName ? { ...payload, model: modelName } : { ...payload, model: 'default' }) 
            });
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            const data = await response.json();
            return data.choices?.[0]?.message?.content;
        }
    } catch (error) {
        console.error(error);
        return `((连接失败: ${error.message} - 请检查 API Key 或网络))`;
    }
};

// --- 组件定义 ---

const GlassCard = ({ children, className = "", onClick }) => (
    <div onClick={onClick} className={`backdrop-blur-2xl bg-white/50 dark:bg-[#18181b] border border-white/40 dark:border-white/5 shadow-sm transition-all duration-300 ${className}`}>
        {children}
    </div>
);

const ThemeToggle = ({ isDark, setIsDark, onThemeOpen, activeTheme }) => (
    <div className="flex items-center gap-1.5">
        <button onClick={onThemeOpen} className={`p-2.5 rounded-full bg-white/40 dark:bg-white/5 text-${activeTheme.primary} hover:scale-110 transition-all dark:brightness-90`}><Palette size={18} /></button>
        <button onClick={() => setIsDark(!isDark)} className="p-2.5 rounded-full bg-white/40 dark:bg-white/5 text-slate-500 hover:scale-110 transition-all">{isDark ? <Sun size={18} className="text-stone-300" /> : <Moon size={18} className="text-sky-500" />}</button>
    </div>
);

// --- 用户指南组件 (User Guide) ---
// 你可以在这里修改指南的文案。修改后保存并 git push 即可更新。
const GuideOverlay = ({ isOpen, onClose, activeTheme }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[300] bg-slate-50/90 dark:bg-[#09090b]/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
            <button onClick={onClose} className="fixed top-6 right-6 p-3 bg-white/50 dark:bg-white/10 rounded-full hover:rotate-90 transition-all shadow-sm border border-white/20 z-[310]">
                <X size={24} className="text-slate-500 dark:text-stone-400"/>
            </button>
            
            <div className="max-w-2xl mx-auto p-8 pt-20 pb-32 space-y-12 dark:text-stone-300">
                <div className="text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${activeTheme.gradient} rounded-full flex items-center justify-center text-4xl shadow-xl dark:brightness-90`}>🪞</div>
                    <h1 className="text-3xl font-serif font-bold text-slate-800 dark:text-stone-200">Resonance Mirror</h1>
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-stone-500">关系动力学 · 深度共振模拟器</p>
                </div>

                <div className="space-y-4">
                    <h2 className={`text-lg font-bold flex items-center gap-2 text-${activeTheme.primary} dark:brightness-90`}><Key size={20}/> 第一步：获取灵魂密钥 (API Key)</h2>
                    <div className="p-6 bg-white/60 dark:bg-[#18181b] rounded-3xl border border-white/40 dark:border-white/5 space-y-4 text-sm leading-relaxed shadow-sm">
                        <p>为了让 AI 能够思考和说话，你需要填入 API Key。这是一个纯前端应用，Key <strong>只保存在你的浏览器里</strong>，不会上传服务器。</p>
                        
                        <div className="space-y-2 pt-2">
                            <h3 className="font-black text-slate-700 dark:text-stone-300">方案 A：Google Gemini </h3>
                            <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-stone-400 ml-1">
                                <li>登录 <a href="https://aistudio.google.com/app/apikey" target="_blank" className={`underline decoration-${activeTheme.primary} font-bold hover:text-${activeTheme.primary}`}>Google AI Studio</a></li>
                                <li>点击 <strong>Create API Key</strong></li>
                                <li>复制生成的以 <code>AIza</code> 开头的长字符串</li>
                                <li>回到本页，在上方 API 卡片中选择 <strong>Gemini</strong> 模式并填入 Key (<strong>Base URL保持为空</strong>)</li>
                                <li>点击右下角刷新，加载模型，选择 gemini-2.5-flash （如果无法选择，请将所有已填项清空）</li>
                            </ol>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/5 mt-4">
                            <h3 className="font-black text-slate-700 dark:text-stone-300">方案 B：OpenAI / 中转商</h3>
                            <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-stone-400 ml-1">
                                <li>从你的服务商处获取 <code>sk-</code> 开头的 Key</li>
                                <li>获取接口地址 (Base URL)，例如 <code>https://api.xyz.com/v1</code></li>
                                <li>在本页选择 <strong>OpenAI</strong> 模式，填入 <strong>Base URL</strong> 和 <strong>Key</strong></li>
                                <li>点击右下角刷新，加载模型，选择可使用模型 （如果无法选择，请将所有已填项清空）</li>
                            </ol>
                        </div>
                        
                        <p><strong>该应用只通过 API Key 联网，所有聊天数据只保存在你的浏览器中，没有云存储</strong>，如果你想保留对话记录，请点击页面下载按钮全量导出。</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className={`text-lg font-bold flex items-center gap-2 text-${activeTheme.primary} dark:brightness-90`}><Users size={20}/> 核心功能：Resonance (共振场)</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-5 bg-white/40 dark:bg-[#18181b] rounded-3xl border border-white/40 dark:border-white/5">
                            <h3 className="font-black mb-2 text-slate-700 dark:text-stone-300">1. 显影立格 (角色创建)</h3>
                            <p className="text-xs text-slate-500 dark:text-stone-500 leading-relaxed">
                                点击 <Plus size={12} className="inline"/> 创建。详细配置 TA 的<strong>星座星盘</strong>和 <strong>MBTI 八维</strong>。只想随机模拟？勾选"未知"，AI 会自动推演。
                            </p>
                        </div>
                        <div className="p-5 bg-white/40 dark:bg-[#18181b] rounded-3xl border border-white/40 dark:border-white/5">
                            <h3 className="font-black mb-2 text-slate-700 dark:text-stone-300">2. 深度共振分析</h3>
                            <p className="text-xs text-slate-500 dark:text-stone-500 leading-relaxed">
                                聊天中点击 <Activity size={12} className="inline"/> 图标。AI 将作为"心理占星师"，结合星盘与对话，分析 TA 当下的心理状态。
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className={`text-lg font-bold flex items-center gap-2 text-${activeTheme.primary} dark:brightness-90`}><Waves size={20}/> 核心功能：Mirror (镜像)</h2>
                    <div className="p-6 bg-white/60 dark:bg-[#18181b] rounded-3xl border border-white/40 dark:border-white/5 text-sm leading-relaxed shadow-sm">
                        <p className="mb-2">这不仅是模拟器，更是一面镜子。</p>
                        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-stone-400">
                            <li>在 <strong>Mirror</strong> 页点击你的卡片，定义你自己的星盘与 MBTI。</li>
                            <li>勾选多个聊天对象，点击 <strong>启动自我洞察</strong>。</li>
                            <li>AI 会反向分析你在不同关系中的行为模式、依恋类型与防御机制。</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center pt-8 opacity-50 text-xs">
                    <p>所有数据仅存储于本地浏览器</p>
                    <p className="mt-2 font-serif italic">Resonance Mirror @Tenlossiby</p>
                </div>
            </div>
        </div>
    );
};

const ThemeDrawer = ({ currentThemeId, onSelect, onClose, isOpen }) => (
    <div className={`fixed inset-0 z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className={`absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-[#18181b] backdrop-blur-3xl rounded-t-[3rem] p-8 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-white/10 rounded-full mx-auto mb-8" />
            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-stone-300 flex items-center gap-2 px-2"><Palette size={20} /> 身份配色方案</h3>
            <div className="grid grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pb-10 px-2">
                {Object.entries(THEMES).map(([id, theme]) => (
                    <button key={id} onClick={() => { onSelect(id); onClose(); }} className={`h-20 rounded-3xl border transition-all relative overflow-hidden group ${currentThemeId === id ? `border-${theme.primary} ring-2 ring-${theme.primary}/20` : 'border-white dark:border-white/5'}`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-80 group-hover:opacity-100 transition-opacity dark:brightness-75`} />
                        {currentThemeId === id && <div className="absolute inset-0 flex items-center justify-center bg-black/10"><CheckSquare className="text-white" size={24} /></div>}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const PersonaEditor = ({ initialData, onSave, onCancel, isSelf, title, isDark, setIsDark, activeTheme, onThemeOpen }) => {
    const [form, setForm] = useState(() => {
        const base = { ...DEFAULT_PROFILE, ...initialData };
        if (!base.relations && base.relationId) {
            base.relations = [base.relationId];
        }
        return base;
    });
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

    const toggleRelation = (id) => {
        setForm(prev => {
            const current = prev.relations || [];
            if (current.includes(id)) {
                return { ...prev, relations: current.filter(r => r !== id) };
            } else {
                return { ...prev, relations: [...current, id] };
            }
        });
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
        <div className="flex flex-col h-full bg-slate-50/50 dark:bg-[#09090b] overflow-y-auto pb-32 text-slate-900 dark:text-stone-400">
            <div className="p-4 bg-white/40 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-white/20 dark:border-white/5 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <button onClick={onCancel} className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/5 transition-all"><ArrowLeft size={20} className="text-slate-500 dark:text-stone-500" /></button>
                    <h2 className="font-serif font-bold text-lg dark:text-stone-300">{title}</h2>
                </div>
                <ThemeToggle isDark={isDark} setIsDark={setIsDark} onThemeOpen={onThemeOpen} activeTheme={activeTheme} />
            </div>
            
            <div className="p-6 max-w-2xl mx-auto w-full space-y-10">
                <section className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-stone-600 ml-1">身份基础</h3>
                    <GlassCard className="rounded-[2rem] p-1 border-white/60 dark:border-white/5">
                        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="TA的昵称" className={`w-full text-xl font-serif p-5 bg-transparent outline-none dark:text-stone-200 placeholder:text-slate-300 dark:placeholder:text-stone-700 caret-${activeTheme.primary} dark:caret-${activeTheme.primary}`}/>
                    </GlassCard>
                    
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-stone-600 ml-1 mb-1 block">性别/身份</label>
                            <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} className="w-full p-4 bg-white/40 dark:bg-[#1c1c1e] border border-white/40 dark:border-white/5 rounded-2xl dark:text-stone-300 outline-none h-[56px]">{GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}</select>
                        </div>
                        <div className="w-1/3">
                            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-stone-600 ml-1 mb-1 block">代词</label>
                            <input value={form.pronoun || 'Ta'} onChange={e => setForm({...form, pronoun: e.target.value})} placeholder="Ta/他/她..." className="w-full p-4 bg-white/40 dark:bg-[#1c1c1e] border border-white/40 dark:border-white/5 rounded-2xl dark:text-stone-300 outline-none h-[56px] text-center font-bold"/>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 dark:text-stone-600 ml-1 mb-2 block">关系定义 (多选)</label>
                        {isSelf ? (
                            <div className={`p-4 bg-${activeTheme.primary}/5 rounded-2xl text-${activeTheme.primary} text-sm flex items-center justify-center font-bold italic h-[56px] dark:brightness-90`}>核心自我</div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {RELATIONSHIP_TYPES.map(type => (
                                    <button 
                                        key={type.id}
                                        onClick={() => toggleRelation(type.id)}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all text-xs font-bold ${
                                            form.relations?.includes(type.id) 
                                            ? `bg-${activeTheme.primary} border-${activeTheme.primary} text-white shadow-md dark:brightness-90` 
                                            : 'bg-white/40 dark:bg-[#1c1c1e] border-white/40 dark:border-white/5 text-slate-500 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-[#252529]'
                                        }`}
                                    >
                                        <type.icon size={14}/> {type.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <div className="flex justify-center">
                    <button onClick={handleRandomRoll} className={`flex items-center gap-2 text-xs font-bold text-${activeTheme.primary} px-6 py-2.5 rounded-full bg-${activeTheme.primary}/10 hover:bg-${activeTheme.primary}/20 transition-all active:scale-95 shadow-sm border border-${activeTheme.primary}/10 dark:brightness-90`}>
                        <RefreshCw size={14}/> 随机生成
                    </button>
                </div>

                <section className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/20 dark:border-white/10 pb-3">
                        <h3 className={`text-xs font-bold uppercase tracking-widest text-${activeTheme.primary} flex items-center gap-2 px-1 dark:brightness-90`}><Star size={12}/> 星图配置</h3>
                        <label className="flex items-center gap-2 cursor-pointer text-[10px] font-bold text-slate-400 dark:text-stone-600 uppercase">未知 <input type="checkbox" checked={form.chartUnknown} onChange={e => setForm({...form, chartUnknown: e.target.checked})} className="rounded text-cyan-600 bg-transparent dark:bg-stone-800 border-stone-600"/></label>
                    </div>
                    {!form.chartUnknown && (
                        <GlassCard className="rounded-[2.5rem] p-6 space-y-6 border-white/50 dark:border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-white/10 dark:border-white/5">
                                <div><label className="text-[9px] uppercase font-black text-slate-400 dark:text-stone-600 block mb-1">分宫制</label><select disabled={form.risingUnknown} value={form.houseSystem} onChange={e => setForm({...form, houseSystem: e.target.value})} className="w-full p-2 text-xs bg-white/40 dark:bg-[#1c1c1e] border border-white/40 dark:border-white/5 rounded-xl dark:text-stone-300">{HOUSE_SYSTEMS.map(h => <option key={h.id} value={h.id}>{h.label}</option>)}</select></div>
                                <div><label className="text-[9px] uppercase font-black text-slate-400 dark:text-stone-600 block mb-1">劫夺星座</label><input disabled={form.risingUnknown || form.houseSystem === 'whole_sign'} value={form.interceptedSigns} onChange={e => setForm({...form, interceptedSigns: e.target.value})} placeholder="例: 狮子/水瓶" className={`w-full p-2 text-xs bg-white/40 dark:bg-[#1c1c1e] border border-white/40 dark:border-white/5 rounded-xl dark:text-stone-300 outline-none placeholder:text-stone-700 caret-${activeTheme.primary}`}/></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {PLANETS.map(p => (
                                    <div key={p.key} className={`p-4 rounded-3xl bg-slate-50/50 dark:bg-[#161618] border border-white/60 dark:border-white/5 transition-all ${p.key === 'rising' && form.risingUnknown ? 'opacity-30' : ''}`}>
                                        <span className="text-[9px] text-slate-400 dark:text-stone-600 uppercase font-bold flex items-center gap-1.5 mb-1.5"><p.icon size={8}/> {p.label}</span>
                                        <select value={form.chart?.[p.key]?.sign} onChange={e => handlePlanetSignChange(p.key, e.target.value)} className={`w-full bg-transparent font-bold text-sm text-${activeTheme.primary} outline-none dark:bg-[#161618] dark:brightness-90`}>{ZODIAC_SIGNS.map(z => <option key={z} value={z}>{z.split(' ')[0]}</option>)}</select>
                                        {p.key !== 'rising' && !form.risingUnknown && <select value={form.chart?.[p.key]?.house} onChange={e => setForm({...form, chart: { ...form.chart, [p.key]: { ...form.chart?.[p.key], house: e.target.value }}})} className="mt-1 bg-transparent text-[10px] text-slate-400 dark:text-stone-600 w-full outline-none dark:bg-[#161618]">{Array.from({length: 12}, (_, i) => i + 1).map(h => <option key={h} value={h.toString()}>{h}宫</option>)}</select>}
                                    </div>
                                ))}
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer p-3 bg-cyan-50/30 dark:bg-cyan-900/10 rounded-2xl border border-cyan-100/50 dark:border-cyan-900/30"><input type="checkbox" checked={form.risingUnknown} onChange={e => setForm({...form, risingUnknown: e.target.checked})} className="rounded text-cyan-600"/><span className="text-[10px] font-bold text-cyan-700 dark:text-cyan-600 uppercase">出生时间不详</span></label>
                        </GlassCard>
                    )}
                </section>
                <section className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/20 dark:border-white/10 pb-3">
                        <h3 className={`text-xs font-bold uppercase tracking-widest text-${activeTheme.primary} flex items-center gap-2 px-1 dark:brightness-90`}><Brain size={12}/> 性格内核 (MBTI)</h3>
                        <label className="flex items-center gap-2 cursor-pointer text-[10px] font-bold text-slate-400 dark:text-stone-600 uppercase">未知 <input type="checkbox" checked={form.mbtiUnknown} onChange={e => setForm({...form, mbtiUnknown: e.target.checked})} className="rounded text-cyan-600 dark:bg-stone-800"/></label>
                    </div>
                    {!form.mbtiUnknown && (
                        <GlassCard className="rounded-[2.5rem] p-6 space-y-6">
                            <div className="grid grid-cols-4 gap-2">
                                {Object.keys(MBTI_DEFAULTS).map(type => (
                                    <button 
                                        key={type} 
                                        onClick={() => setForm(prev => ({ ...prev, mbti: type, functions: { ...MBTI_DEFAULTS[type] } }))} 
                                        className={`py-2 rounded-xl text-[10px] font-mono border transition-all ${
                                            form.mbti === type 
                                                ? `bg-gradient-to-r ${activeTheme.gradient} text-white font-bold shadow-md border-transparent dark:brightness-75` 
                                                : 'bg-white/40 dark:bg-[#1c1c1e] text-slate-500 dark:text-stone-500 border-white/40 dark:border-white/5'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-center"><button onClick={() => setShowAdvancedMBTI(!showAdvancedMBTI)} className={`flex items-center gap-2 text-[10px] font-black uppercase text-${activeTheme.primary} px-4 py-1.5 rounded-full bg-${activeTheme.primary}/10 hover:bg-${activeTheme.primary}/20 transition-all dark:brightness-90`}><Sliders size={12}/> {showAdvancedMBTI ? "收回八维" : "八维进阶设置"}</button></div>
                            {showAdvancedMBTI && <div className="grid grid-cols-2 gap-x-8 gap-y-6 animate-in slide-in-from-top-2">{FUNCTION_ORDER.map(func => (<div key={func} className="space-y-2"><div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-stone-500 uppercase"><span>{func}</span><span>{form.functions?.[func]}</span></div><input type="range" min="0" max="100" value={form.functions?.[func]} onChange={e => setForm({...form, functions: {...form.functions, [func]: parseInt(e.target.value)}})} className={`w-full h-1 bg-slate-200 dark:bg-stone-800 rounded-full appearance-none accent-${activeTheme.primary}`}/></div>))}</div>}
                        </GlassCard>
                    )}
                </section>
                <button onClick={() => onSave(form)} className={`w-full py-5 bg-gradient-to-r ${activeTheme.gradient} text-white rounded-[2rem] shadow-2xl font-bold text-lg transition-all active:scale-[0.98] dark:brightness-75`}>保存共振配置</button>
            </div>
        </div>
    );
};

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

    const handleExportChat = () => {
        const time = new Date().toLocaleString();
        const content = `Resonance 共振记录 - ${contact.name}\n导出时间: ${time}\n\n` + 
            messages.map(m => `[${m.role === 'user' ? '我' : contact.name}]: ${m.content}`).join('\n\n');
        exportToTxt(`Resonance_${contact.name}_${Date.now()}.txt`, content);
    };

    const handleDeepAnalysis = async () => {
        setIsTyping(true);
        
        const formatChartData = (chart) => {
            if (!chart) return "数据缺失";
            return PLANETS.map(p => {
                const data = chart[p.key];
                if (!data) return null;
                const houseStr = data.house ? `${data.house}宫` : '';
                return `${p.label}落在${data.sign}${houseStr ? ` (${houseStr})` : ''}`;
            }).filter(Boolean).join('，');
        };

        const userChartStr = userProfile.chartUnknown ? "星盘未知" : formatChartData(userProfile.chart);
        const userInfo = `[我方 (${userProfile.name || '我'})]\n- 角色: 核心自我\n- MBTI: ${userProfile.mbtiUnknown ? '未知' : userProfile.mbti}\n- 星盘配置: ${userChartStr}\n- 分宫制: ${userProfile.houseSystem}\n- 劫夺情况: ${userProfile.interceptedSigns || '无'}`;
        
        const relationLabels = (contact.relations || [contact.relationId || 'friend'])
            .map(rid => RELATIONSHIP_TYPES.find(r => r.id === rid)?.label)
            .filter(Boolean)
            .join(' + ');
        
        const contactChartStr = contact.chartUnknown ? "星盘未知" : formatChartData(contact.chart);
        const pronoun = contact.pronoun || 'Ta';
        const contactInfo = `[对方 (${contact.name})]\n- 定义关系: ${relationLabels}\n- 性别/身份: ${contact.gender}\n- 代词: ${pronoun}\n- MBTI: ${contact.mbtiUnknown ? '未知' : contact.mbti}\n- 星盘配置: ${contactChartStr}\n- 分宫制: ${contact.houseSystem}\n- 劫夺情况: ${contact.interceptedSigns || '无'}`;
        
        const ctxInfo = context ? `[当下情境 (默认为${pronoun}的状态，若包含'我'则为双方互动)]: ${context}` : `[当下情境]: 未特别指定，请推演${pronoun}的状态`;

        const prompt = `深度共振分析请求：\n\n${userInfo}\n\n${contactInfo}\n\n${ctxInfo}\n\n指令：\n1. 【核心聚焦】：请将重点完全放在[当下情境]下对方的心理状态揣摩，以及我们这段${relationLabels}关系的流动上。\n2. 【轻度辅佐】：MBTI认知功能和星盘能量仅作为底层逻辑支撑，不要大段列举分析。只需要在解释关系动态时，顺带提一句（例如："受Ta金星天蝎的影响..."或"由于Ti功能的运作..."）即可，点到为止。\n3. 【行动指引】：给出平实、生活化且温情的建议，帮助我更好地在这个当下与Ta连接。\n4. 语气要求：像一位老友在深夜谈心，直觉敏锐但语言日常，不要像教科书。请用"${pronoun}"来称呼对方。`;
        
        const sys = "你是一位精通心理占星与MBTI动力学的深度关系分析师。你的回答应当是平实、深刻且具有治愈力的。禁止使用Markdown格式。";
        
        const reply = await callAI(prompt, sys, apiConfig, userProfile);
        setMessages(prev => [...prev, { role: 'ai', content: `[共振深度回响]\n\n${reply}` }]);
        setIsTyping(false);
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-[#09090b] relative overflow-hidden text-slate-900 dark:text-stone-400">
            <div className="sticky top-0 z-[100] flex-none bg-white/60 dark:bg-[#09090b]/90 backdrop-blur-2xl border-b border-white/20 dark:border-white/5 shadow-sm transition-all">
                <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="p-2.5 rounded-full text-slate-500 dark:text-stone-500"><ArrowLeft size={18} /></button>
                        <div className="flex flex-col">
                            <h3 className="font-bold flex items-center gap-2 dark:text-stone-200">
                                {contact.name}
                                {!contact.mbtiUnknown && <span className={`text-[9px] font-mono font-black text-${activeTheme.primary} dark:brightness-90`}>{contact.mbti}</span>}
                            </h3>
                            <div className="flex items-center gap-2 opacity-50">
                                {!contact.chartUnknown && (
                                    <span className="text-[8px] font-black uppercase tracking-tighter dark:text-stone-500">
                                        Sun {contact.chart?.sun?.sign.split(' ')[0]} / Asc {contact.chart?.rising?.sign.split(' ')[0]}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handleExportChat} className={`p-2.5 rounded-full text-slate-500 dark:text-stone-500 hover:bg-black/5 dark:hover:bg-white/10`} title="导出聊天记录"><Download size={18}/></button>
                        <button onClick={handleDeepAnalysis} className={`p-2.5 rounded-full text-${activeTheme.primary} bg-${activeTheme.primary}/10 shadow-sm dark:brightness-90`}><Activity size={18}/></button>
                        <ThemeToggle isDark={isDark} setIsDark={setIsDark} onThemeOpen={onThemeOpen} activeTheme={activeTheme} />
                        <button onClick={onEdit} className="p-2.5 rounded-full text-slate-500 dark:text-stone-500"><Settings size={18}/></button>
                    </div>
                </div>
                <div className="px-5 pb-3 pt-1">
                    <div className="flex items-center gap-2 bg-white/30 dark:bg-[#121212] rounded-2xl px-4 py-1.5 border border-white/40 dark:border-white/5 shadow-inner group">
                        <span className={`text-[9px] font-black text-${activeTheme.primary} uppercase tracking-widest whitespace-nowrap dark:brightness-90`}>当下情境</span>
                        <input 
                            value={context} onChange={e => setContext(e.target.value)} 
                            placeholder={`TA当下的状态？(若是你的情绪请注明'我...')`}
                            className={`w-full bg-transparent text-xs text-slate-600 dark:text-stone-400 outline-none placeholder:text-stone-700 caret-${activeTheme.primary}`}
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-28 no-scrollbar">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-[1.8rem] text-sm leading-relaxed whitespace-pre-wrap backdrop-blur-2xl border shadow-sm ${
                            msg.role === 'user' 
                                ? `bg-white/40 dark:bg-${activeTheme.primary}/20 border-${activeTheme.primary}/20 text-slate-900 dark:text-stone-200 rounded-br-none dark:brightness-90` 
                                : 'bg-white/60 dark:bg-[#1c1c1e] border-white/40 dark:border-white/5 text-slate-800 dark:text-stone-300 rounded-bl-none'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && <div className={`text-[10px] text-${activeTheme.primary} ml-4 animate-pulse`}>读取意识场...</div>}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 absolute bottom-0 left-0 right-0 z-50">
                <GlassCard className="rounded-[2.5rem] p-2 flex gap-2 border-white/60 dark:border-white/5 shadow-xl bg-white/50 dark:bg-[#121212]">
                    <button onClick={() => handleSend("((眼神交流并尝试回应))")} className={`p-3 text-${activeTheme.primary} dark:brightness-90`}><Waves size={20}/></button>
                    <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="发送显影信号..." className={`flex-1 bg-transparent px-2 py-3 text-sm outline-none dark:text-stone-200 placeholder:text-stone-600 caret-${activeTheme.primary}`}/>
                    <button onClick={() => handleSend()} className={`p-3 bg-${activeTheme.primary} text-white rounded-full dark:brightness-75`}><Send size={20} /></button>
                </GlassCard>
            </div>
        </div>
    );
};

const MirrorTab = ({ userProfile, setUserProfile, contacts, isEditingSelf, setIsEditingSelf, onClearData, isDark, setIsDark, activeTheme, onThemeOpen, apiConfig, setApiConfig }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');
    const [isResultExpanded, setIsResultExpanded] = useState(true);
    const [availableModels, setAvailableModels] = useState([]);
    const [isFetchingModels, setIsFetchingModels] = useState(false);
    
    // 控制用户指南的开关
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    const fetchModels = async () => {
        const { apiKey, baseUrl, modelType } = apiConfig;
        if (!apiKey) { alert("请先填写 API Key"); return; }
        
        setIsFetchingModels(true);
        let fetchUrl = '';
        let headers = {};

        try {
            if (modelType === 'gemini') {
                const finalBase = baseUrl || 'https://generativelanguage.googleapis.com';
                fetchUrl = `${finalBase}/v1beta/models?key=${apiKey}`;
            } else {
                const finalBase = baseUrl || 'https://api.openai.com/v1';
                const cleanBase = finalBase.replace(/\/$/, '');
                fetchUrl = `${cleanBase}/models`; 
                headers = { 'Authorization': `Bearer ${apiKey}` };
            }

            const res = await fetch(fetchUrl, { method: 'GET', headers });
            const data = await res.json();

            let models = [];
            if (modelType === 'gemini') {
                if (data.models) models = data.models.map(m => m.name.replace('models/', '')); 
            } else {
                if (data.data) models = data.data.map(m => m.id);
            }

            if (models.length > 0) {
                setAvailableModels(models);
                alert(`成功获取 ${models.length} 个模型！请点击输入框选择。`);
            } else {
                alert("获取成功，但列表为空，请检查中转商是否支持。");
            }
        } catch (e) {
            console.error(e);
            alert("拉取模型失败，请检查 Base URL 是否正确。");
        } finally {
            setIsFetchingModels(false);
        }
    };

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

    const handleExportMirror = () => {
        if (selectedIds.length === 0 && !analysisResult) {
            alert("请先选择角色或生成洞察结果");
            return;
        }
        
        let content = `Resonance 自我镜像导出 - ${new Date().toLocaleString()}\n\n`;
        
        if (analysisResult) {
            content += `【深度洞察结果】\n${analysisResult}\n\n====================\n\n`;
        }

        if (selectedIds.length > 0) {
            const selectedContacts = contacts.filter(c => selectedIds.includes(c.id));
            selectedContacts.forEach(c => {
                content += `【与 ${c.name} 的共振记录】\n`;
                content += (c.messages || []).map(m => `[${m.role === 'user' ? '我' : c.name}]: ${m.content}`).join('\n');
                content += `\n--------------------------\n\n`;
            });
        }

        exportToTxt(`Resonance_Mirror_${Date.now()}.txt`, content);
    };

    if (isEditingSelf) return <PersonaEditor title="核心自我" initialData={userProfile} onSave={(u) => { setUserProfile(u); setIsEditingSelf(false); }} onCancel={() => setIsEditingSelf(false)} isSelf={true} isDark={isDark} setIsDark={setIsDark} activeTheme={activeTheme} onThemeOpen={onThemeOpen} />;

    return (
        <div className="flex flex-col h-full bg-slate-50/50 dark:bg-[#09090b] overflow-y-auto pb-32 text-slate-900 dark:text-stone-400">
            <GuideOverlay isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} activeTheme={activeTheme} />
            
            <div className="p-4 bg-white/40 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-white/20 dark:border-white/5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <h1 className="text-2xl font-serif font-black tracking-tighter italic dark:text-stone-200">Mirror</h1>
                <ThemeToggle isDark={isDark} setIsDark={setIsDark} onThemeOpen={onThemeOpen} activeTheme={activeTheme} />
            </div>
            <div className="p-6 space-y-8 max-w-2xl mx-auto w-full">
                
                <GlassCard className="rounded-[2.5rem] p-8 space-y-6 border-white/60 dark:border-white/5 shadow-xl order-first">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold flex items-center gap-2 dark:text-stone-200"><Waves size={18} className={`text-${activeTheme.primary} dark:brightness-90`}/> 自我模式镜像</h2>
                        <button onClick={handleExportMirror} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-stone-400" title="导出数据"><Download size={16}/></button>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-stone-500">选择共振对象，看看TA们映射出的你是谁。</p>
                    <div className="flex flex-wrap gap-2">{contacts.map(c => <button key={c.id} onClick={() => setSelectedIds(prev => prev.includes(c.id) ? prev.filter(i => i !== c.id) : [...prev, c.id])} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${selectedIds.includes(c.id) ? `bg-${activeTheme.primary} border-${activeTheme.primary} text-white shadow-lg dark:brightness-75` : 'bg-white/40 dark:bg-[#1c1c1e] text-slate-500 dark:text-stone-400 dark:border-white/5'}`}>{selectedIds.includes(c.id) ? <CheckSquare size={12}/> : <Square size={12}/>}{c.name}</button>)}</div>
                    <button onClick={runMirrorAnalysis} disabled={isAnalyzing || selectedIds.length === 0} className={`w-full py-5 bg-gradient-to-r ${activeTheme.gradient} backdrop-blur-sm text-white rounded-3xl font-black shadow-xl hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center tracking-widest dark:brightness-75`}>{isAnalyzing ? <Loader2 className="animate-spin" /> : "启动自我洞察共振"}</button>
                    {analysisResult && (
                        <div className={`mt-4 p-6 bg-${activeTheme.primary}/5 rounded-[2rem] border border-${activeTheme.primary}/10 animate-in slide-in-from-bottom-2 dark:bg-[#1c1c1e]`}>
                            <div className="flex items-center justify-between mb-2"><span className={`text-xs font-black text-${activeTheme.primary} uppercase tracking-widest dark:brightness-90`}>洞察回响</span><button onClick={() => setIsResultExpanded(!isResultExpanded)}>{isResultExpanded ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}</button></div>
                            {isResultExpanded ? <div className="text-sm leading-relaxed whitespace-pre-wrap font-serif dark:text-stone-300">{analysisResult}</div> : <div className="text-xs italic opacity-50">点击展开深度洞察...</div>}
                        </div>
                    )}
                </GlassCard>

                <GlassCard className="rounded-[3rem] p-8 space-y-10 border-white/60 dark:border-white/5 relative overflow-hidden">
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="relative p-1.5 rounded-full backdrop-blur-xl bg-white/20 dark:bg-white/5 border border-white/40 dark:border-white/5 shadow-inner">
                            <div className={`w-20 h-20 bg-gradient-to-br ${activeTheme.gradient} rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl border-2 border-white/30 dark:brightness-90`}>{userProfile.name?.[0] || '我'}</div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold font-serif dark:text-stone-200">{userProfile.name || '未定义'}</h2>
                            <div className="flex gap-2 mt-1.5"><span className={`text-[10px] font-black uppercase text-${activeTheme.primary} px-2 py-0.5 bg-${activeTheme.primary}/10 rounded-full border border-${activeTheme.primary}/20 dark:brightness-90`}>{userProfile.mbtiUnknown ? "性格未知" : userProfile.mbti}</span></div>
                        </div>
                        <button onClick={() => setIsEditingSelf(true)} className="p-3 bg-white/40 dark:bg-[#1c1c1e] rounded-full text-slate-500 dark:text-stone-400 hover:scale-110 transition-all border border-white/60 dark:border-white/5"><Edit2 size={18}/></button>
                    </div>
                </GlassCard>

                <GlassCard className="rounded-[2.5rem] p-6 space-y-4 border-white/60 shadow-inner bg-white/20 dark:bg-transparent dark:border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                        <Key size={14} className={`text-${activeTheme.primary} dark:brightness-90`} />
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-stone-600">核心共振参数 (API)</h3>
                    </div>
                    <div className="grid gap-3">
                        <select 
                            value={apiConfig.modelType} 
                            onChange={e => setApiConfig({...apiConfig, modelType: e.target.value})}
                            className="w-full p-3 bg-white/40 dark:bg-[#121212] border border-white/40 dark:border-white/5 rounded-2xl text-[11px] font-bold outline-none dark:text-stone-300"
                        >
                            <option value="openai">模式: OpenAI / 通用转发</option>
                            <option value="gemini">模式: Google Gemini (官方)</option>
                        </select>
                        
                        <input 
                            placeholder="Base URL..." 
                            value={apiConfig.baseUrl} 
                            onChange={e => setApiConfig({...apiConfig, baseUrl: e.target.value})}
                            className="w-full p-3 bg-white/40 dark:bg-[#121212] border border-white/40 dark:border-white/5 rounded-2xl text-[11px] outline-none dark:text-stone-300 placeholder:text-slate-400 dark:placeholder:text-stone-700"
                        />
                        
                        <input 
                            type="password"
                            placeholder="API Key..." 
                            value={apiConfig.apiKey} 
                            onChange={e => setApiConfig({...apiConfig, apiKey: e.target.value})}
                            className="w-full p-3 bg-white/40 dark:bg-[#121212] border border-white/40 dark:border-white/5 rounded-2xl text-[11px] outline-none dark:text-stone-300 placeholder:text-slate-400 dark:placeholder:text-stone-700"
                        />

                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input 
                                    list="model-options"
                                    placeholder="Model Name..." 
                                    value={apiConfig.modelName} 
                                    onChange={e => setApiConfig({...apiConfig, modelName: e.target.value})}
                                    className="w-full p-3 bg-white/40 dark:bg-[#121212] border border-white/40 dark:border-white/5 rounded-2xl text-[11px] outline-none dark:text-stone-300 placeholder:text-slate-400 dark:placeholder:text-stone-700"
                                />
                                <datalist id="model-options">
                                    {availableModels.map(m => <option key={m} value={m} />)}
                                </datalist>
                            </div>
                            <button 
                                onClick={fetchModels}
                                disabled={isFetchingModels}
                                className={`px-4 rounded-2xl bg-white/40 dark:bg-[#121212] border border-white/40 dark:border-white/5 text-${activeTheme.primary} hover:bg-white/60 dark:hover:bg-[#1c1c1e] transition-all dark:brightness-90`}
                            >
                                {isFetchingModels ? <Loader2 size={16} className="animate-spin"/> : <RefreshCw size={16}/>}
                            </button>
                        </div>
                    </div>
                </GlassCard>

                {/* 新增：用户指南入口按钮 */}
                <button 
                    onClick={() => setIsGuideOpen(true)}
                    className="w-full py-4 rounded-[2rem] border border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center gap-2 text-slate-400 dark:text-stone-500 hover:bg-white/40 dark:hover:bg-white/5 transition-all group"
                >
                    <BookOpen size={16} className={`group-hover:text-${activeTheme.primary} transition-colors`} />
                    <span className="text-xs font-bold uppercase tracking-widest group-hover:text-slate-600 dark:group-hover:text-stone-300">Resonance Mirror 使用指南</span>
                </button>

                <div className="flex flex-col gap-4">
                    <button onClick={onClearData} className="w-full p-5 bg-white/30 dark:bg-red-900/10 backdrop-blur-xl rounded-3xl flex items-center justify-between text-red-500 border border-white/40 dark:border-white/5 hover:bg-red-500/10 transition-all shadow-sm"><span className="flex items-center gap-3 text-xs font-black uppercase tracking-widest"><Trash2 size={16}/> 抹除所有数据</span></button>
                    <div className="text-center opacity-30 text-[10px] font-black tracking-widest uppercase pb-4 dark:text-stone-600">
                        Manifested by Tenlossiby
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const [apiConfig, setApiConfig] = useState(() => JSON.parse(localStorage.getItem('resonance_local_api_config')) || {
        apiKey: '',
        baseUrl: '', 
        modelType: 'openai', 
        modelName: '' 
    });

    useEffect(() => localStorage.setItem('resonance_local_api_config', JSON.stringify(apiConfig)), [apiConfig]);
    
    const [activeTab, setActiveTab] = useState('resonance'); 
    const [view, setView] = useState('list'); 
    const [isEditingSelf, setIsEditingSelf] = useState(false);
    const [themeId, setThemeId] = useState(() => localStorage.getItem('resonance_local_theme_id') || 't1');
    const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
    const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('resonance_local_contacts')) || []);
    const [userProfile, setUserProfile] = useState(() => JSON.parse(localStorage.getItem('resonance_local_user_profile')) || DEFAULT_PROFILE);
    const [isDark, setIsDark] = useState(() => localStorage.getItem('resonance_local_theme_dark') === 'dark');
    const [activeContactId, setActiveContactId] = useState(null);

    useEffect(() => localStorage.setItem('resonance_local_contacts', JSON.stringify(contacts)), [contacts]);
    useEffect(() => localStorage.setItem('resonance_local_user_profile', JSON.stringify(userProfile)), [userProfile]);
    useEffect(() => localStorage.setItem('resonance_local_theme_id', themeId), [themeId]);
    useEffect(() => { 
        document.documentElement.classList.toggle('dark', isDark); 
        localStorage.setItem('resonance_local_theme_dark', isDark ? 'dark' : 'light'); 
    }, [isDark]);
    
    // 每次挂载时，强制应用 body 背景色
    useEffect(() => {
        document.body.className = isDark 
            ? 'bg-[#09090b] text-stone-400 loaded' 
            : 'bg-slate-50 text-slate-900 loaded';
    }, [isDark]);

    const activeTheme = THEMES[themeId] || THEMES.t1;
    const activeContact = contacts.find(c => c.id === activeContactId);

    // 内部样式覆盖：滚动条与选中态
    const GlobalStyles = () => (
        <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            input, textarea, [contenteditable] { caret-color: auto; }
            *::selection { background-color: #bae6fd !important; color: #0f172a !important; }
            .dark *::selection { background-color: rgba(255, 255, 255, 0.25) !important; color: inherit !important; }
        `}</style>
    );

    return (
        <div 
            className={`h-[100dvh] w-full flex flex-col font-sans transition-all duration-700 overflow-hidden relative selection:bg-white/30`}
            style={{ 
                backgroundColor: isDark ? '#09090b' : '#f8fafc',
                color: isDark ? '#a8a29e' : '#0f172a'
            }}
        >
            <GlobalStyles />
            <div className="fixed inset-0 pointer-events-none transition-all duration-1000">
                <div className={`absolute top-[-15%] left-[-15%] w-[80%] h-[80%] opacity-40 dark:opacity-5 blur-[140px] animate-pulse rounded-full ${activeTheme.bgLight} dark:${activeTheme.bgDark}`} />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] opacity-30 dark:opacity-5 blur-[120px] rounded-full bg-gradient-to-br ${activeTheme.gradient}`} />
            </div>

            <ThemeDrawer currentThemeId={themeId} onSelect={setThemeId} isOpen={isThemeDrawerOpen} onClose={() => setIsThemeDrawerOpen(false)} />
            
            <div className="flex-1 overflow-hidden relative z-10">
                {activeTab === 'resonance' && (
                view === 'list' ? (
                    <div className="h-full flex flex-col animate-in fade-in bg-slate-50/50 dark:bg-[#09090b]">
                        <div className="p-4 bg-white/40 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-white/20 dark:border-white/5 flex items-center justify-between shadow-sm sticky top-0 z-20">
                            <h1 className="text-2xl font-serif font-black italic tracking-tighter text-black dark:text-stone-200">Resonance</h1>
                            <ThemeToggle isDark={isDark} setIsDark={setIsDark} onThemeOpen={() => setIsThemeDrawerOpen(true)} activeTheme={activeTheme} />
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24 no-scrollbar">
                            <button onClick={() => { setActiveContactId(null); setView('create'); }} className={`w-full py-10 border border-dashed border-slate-300/50 dark:border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 bg-white/20 dark:bg-[#121212]/40 backdrop-blur-xl transition-all hover:bg-white/40 dark:hover:bg-[#121212] shadow-sm group`}>
                                <Plus size={24} className={`text-${activeTheme.primary} dark:brightness-90`}/>
                                <span className="font-black uppercase text-[10px] tracking-widest text-slate-400 dark:text-stone-500">共振显影</span>
                            </button>
                            <div className="grid gap-4">
                                {contacts.map(c => (
                                    <GlassCard key={c.id} onClick={() => { setActiveContactId(c.id); setView('chat'); }} className="p-5 rounded-[2.2rem] flex justify-between items-center group active:scale-95 transition-all relative overflow-hidden">
                                        <div className="flex items-center gap-5 relative z-10">
                                            <div className="p-1 rounded-full backdrop-blur-lg bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/5 shadow-sm">
                                                <div className={`w-14 h-14 bg-gradient-to-br ${activeTheme.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-white/20 dark:brightness-75`}>{c.name?.[0]}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="font-bold text-lg tracking-tight text-slate-900 dark:text-stone-200">{c.name}</h3>
                                                <div className={`text-[9px] font-black uppercase text-${activeTheme.primary} font-mono tracking-widest bg-${activeTheme.primary}/10 px-2 py-0.5 rounded-full border border-${activeTheme.primary}/10 w-fit dark:brightness-90`}>{c.mbtiUnknown ? "未知性格" : c.mbti}</div>
                                            </div>
                                        </div>
                                        <div className="relative z-10 p-2 rounded-full bg-white/20 dark:bg-white/5 border border-white/40 dark:border-white/5"><ChevronLeft size={16} className="text-slate-400 dark:text-stone-600 rotate-180"/></div>
                                    </GlassCard>
                                ))}
                            </div>
                            <div className="text-center opacity-20 text-[9px] font-black tracking-widest uppercase py-8 text-slate-500 dark:text-stone-600">
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
                <GlassCard className="h-20 w-full max-w-sm rounded-[2.5rem] flex items-center justify-center gap-12 border-white/60 dark:border-white/5 shadow-2xl px-10 bg-white/50 dark:bg-[#121212]">
                    <button onClick={() => setActiveTab('resonance')} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeTab === 'resonance' ? `text-${activeTheme.primary} scale-110 dark:brightness-90` : 'text-slate-400 dark:text-stone-600'}`}>
                    <Users size={24} strokeWidth={activeTab === 'resonance' ? 2.5 : 2} /><span className="text-[9px] font-black uppercase tracking-widest">Resonance</span>
                    </button>
                    <button onClick={() => { setActiveTab('mirror'); setIsEditingSelf(false); }} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeTab === 'mirror' ? `text-${activeTheme.primary} scale-110 dark:brightness-90` : 'text-slate-400 dark:text-stone-600'}`}>
                    <User size={24} strokeWidth={activeTab === 'mirror' ? 2.5 : 2} /><span className="text-[9px] font-black uppercase tracking-widest">Mirror</span>
                    </button>
                </GlassCard>
                </div>
            )}
        </div>
    );
}