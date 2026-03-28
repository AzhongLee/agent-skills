export interface LocalizedText {
  en: string;
  zh: string;
}

export interface WebsiteHeroStat {
  label: LocalizedText;
  value: string;
}

export interface WebsiteAccessMode {
  accent: "gold" | "mint" | "coral";
  description: LocalizedText;
  title: LocalizedText;
}

export interface WebsiteCapabilityGroup {
  accent: "gold" | "mint" | "coral" | "lime" | "sky";
  description: LocalizedText;
  items: readonly string[];
  layoutClassName: string;
  title: LocalizedText;
}

export interface WebsiteResourceLink {
  accent: "gold" | "mint" | "coral" | "lime" | "sky";
  href: string;
  note: LocalizedText;
  title: LocalizedText;
}

export const heroTitle = "bytedcli";

export const pageTitle: LocalizedText = {
  en: "bytedcli | ByteDance internal CLI",
  zh: "bytedcli | 字节研发命令行",
};

export const pageDescription: LocalizedText = {
  en: "bytedcli showcase site for CLI, skills, MCP, and the website/SKILL.md guide.",
  zh: "bytedcli 展示页，覆盖 CLI、Skill、MCP，以及 website/SKILL.md 使用指南。",
};

export const heroEyebrow: LocalizedText = {
  en: "ByteDance Internal CLI",
  zh: "字节研发命令行",
};

export const heroDescription: LocalizedText = {
  en: "ByteDance internal CLI for agents and operators. One entry point for auth, code, delivery, databases, data, cloud, observability, and docs.",
  zh: "面向 Agent 和研发同学的字节内部 CLI。一个入口覆盖认证、代码、发布、数据库、数据、云资源、可观测与文档能力。",
};

export const languageLabel: LocalizedText = {
  en: "Language",
  zh: "语言",
};

export const accessModes: readonly WebsiteAccessMode[] = [
  {
    accent: "gold",
    title: {
      en: "CLI first",
      zh: "优先走 CLI",
    },
    description: {
      en: "Use the command surface directly when the agent can run shell commands and needs structured JSON output.",
      zh: "当 Agent 可以执行 shell，且需要稳定的 JSON 输出时，优先直接调用 CLI。",
    },
  },
  {
    accent: "mint",
    title: {
      en: "Skills",
      zh: "Skills",
    },
    description: {
      en: "Install the unified bytedcli skill or targeted skill packs from skills/ when the client prefers tool-less workflows or curated references.",
      zh: "当客户端更适合无工具工作流或需要带引用资料的封装时，优先安装统一的 bytedcli skill，也可以按需安装 skills/ 下的分域 Skill。",
    },
  },
  {
    accent: "coral",
    title: {
      en: "MCP fallback",
      zh: "MCP 兜底",
    },
    description: {
      en: "Expose the same command tree as MCP tools when the host wants standard tool calling instead of shell execution.",
      zh: "当宿主更适合标准化 tool calling 而不是直接执行 shell 时，暴露同一套 MCP tools。",
    },
  },
];

export const capabilityGroups: readonly WebsiteCapabilityGroup[] = [
  {
    accent: "gold",
    title: {
      en: "Code and Release",
      zh: "代码与发布",
    },
    description: {
      en: "Ship changes, inspect repos, generate code, and drive release flows.",
      zh: "覆盖代码变更、仓库查询、代码生成与发布流程。",
    },
    layoutClassName: "span-4",
    items: [
      "auth",
      "codebase",
      "bam",
      "bits",
      "scm",
      "overpass",
      "agw",
      "goofy",
      "rpc",
    ],
  },
  {
    accent: "mint",
    title: {
      en: "Infra and Cloud",
      zh: "基础设施与云平台",
    },
    description: {
      en: "Query services, environments, traffic rules, and platform topology.",
      zh: "查询服务、环境、流量规则与平台拓扑。",
    },
    layoutClassName: "span-4",
    items: [
      "bytecloud",
      "tce",
      "tcc",
      "env",
      "netlink",
      "neptune",
      "cronjob",
      "settings",
    ],
  },
  {
    accent: "coral",
    title: {
      en: "Data and Storage",
      zh: "数据与存储",
    },
    description: {
      en: "Move across SQL, object storage, catalogs, queues, and analytics workflows.",
      zh: "覆盖 SQL、对象存储、数据目录、消息队列与分析流程。",
    },
    layoutClassName: "span-4",
    items: [
      "tos",
      "rds",
      "bytedoc",
      "cache",
      "hive",
      "aeolus",
      "dorado",
      "tqs",
      "bmq",
    ],
  },
  {
    accent: "lime",
    title: {
      en: "Observability",
      zh: "可观测性",
    },
    description: {
      en: "Inspect runtime behavior, logs, dashboards, alarm rules, and incident-facing signals.",
      zh: "查看运行态行为、日志、监控面板、告警规则、查询结果与故障信号。",
    },
    layoutClassName: "span-5",
    items: [
      "log",
      "apm",
      "es",
      "slardar-web",
    ],
  },
  {
    accent: "sky",
    title: {
      en: "Collaboration",
      zh: "协作平台",
    },
    description: {
      en: "Work with docs, tickets, chat surfaces, and agent-facing prompt systems.",
      zh: "处理文档、工单、聊天协作面板与面向 Agent 的提示系统。",
    },
    layoutClassName: "span-7",
    items: [
      "feishu",
      "cloud-docs",
      "cloud-ticket",
      "bytetech",
      "meego",
      "fornax",
      "bitsai",
      "aime",
    ],
  },
  {
    accent: "gold",
    title: {
      en: "Security and Identity",
      zh: "安全与身份",
    },
    description: {
      en: "Handle permissions, keys, and employee identity lookups without ad hoc scripts.",
      zh: "处理权限、密钥与员工身份查询，避免额外拼脚本。",
    },
    layoutClassName: "span-12",
    items: [
      "dkms",
      "kmsv2",
      "iam",
    ],
  },
];

export const supportedCommandCount = String(
  new Set(capabilityGroups.flatMap((group) => group.items)).size
);

export const heroStats: readonly WebsiteHeroStat[] = [
  {
    label: {
      en: "supported commands",
      zh: "支持的命令",
    },
    value: supportedCommandCount,
  },
  {
    label: {
      en: "access modes",
      zh: "接入方式",
    },
    value: "CLI / Skill / MCP",
  },
  {
    label: {
      en: "guide source",
      zh: "文档来源",
    },
    value: "website/SKILL.md",
  },
];

export const quickStartTitle: LocalizedText = {
  en: "Quick Start",
  zh: "快速开始",
};

export const quickStartCopy: LocalizedText = {
  en: "Use the same shell prefix everywhere. Default to JSON when an agent needs stable parsing, prefer pasting console URLs directly when a command supports them, and use --http-debug / --http-print when you need request-response traces. Text help now shows command-specific notes and examples by default, while advanced proxy, trace, and color globals stay folded unless you rerun help with --debug. Keep Codebase flows on the gh-style resource groups such as codebase auth/repo/mr/issue/run, and keep ByteDoc fully grouped under `bytedoc db ...` for inventory, detail, collections, query, and slow-query analysis; `bytedoc db query` auto-detects classic vs cloud-native targets. When you run inside a code.byted.org checkout, Codebase commands can infer the repository from the current git origin, run list and mr create can fall back to the current branch, mr/issue list default to open results, mr view/review and targeted review or queue actions can fall back to the current branch, and issue/mr view both accept console URLs. Feishu sheet URLs that embed bitable now both return worksheet-vs-bitable guidance on `sheet read` and auto-resolve on `bitable record list --url`. If you installed bytedcli globally with npm, use `bytedcli update` to upgrade.",
  zh: "所有场景都复用同一段 shell 前缀。只要 Agent 需要稳定解析，就默认加上 JSON 输出；命令支持时优先直接粘贴控制台 URL；需要排查请求链路时再使用 --http-debug / --http-print。文本 help 现在默认会直接展示命令级 Notes 与 Examples，并把代理、trace、颜色等高级全局参数折叠起来；如果要看完整展开，可重新执行 `--help --debug`。Codebase 相关流程统一走类似 gh 的 `codebase auth/repo/mr/issue/run` 资源分组入口，ByteDoc 则统一使用 `bytedoc db ...` 处理数据库搜索、列表、详情、集合查询、数据查询与慢查询分析；其中 `bytedoc db query` 会自动识别 classic 与 cloud-native 目标。在 `code.byted.org` 的 Git 仓库内运行时，Codebase 命令还可以直接从当前 `origin` 自动推断仓库，且 `run list` 和 `mr create` 会自动回落到当前分支，`mr list` / `issue list` 默认会像 gh 一样只返回 open 结果，`mr view` / `mr review` 以及 review/queue 下的 targeted 子命令也会默认回落到当前分支，`issue view` / `mr view` 都支持直接粘贴控制台 URL。对于实际嵌入了 bitable 的飞书 sheet URL，CLI 现在既会在 `sheet read` 里返回明确指引，也支持在 `bitable record list --url` 里自动完成解析。如果是本地 npm 全局安装，则可通过 `bytedcli update` 升级。",
};

export const quickCurlHintTitle: LocalizedText = {
  en: "Markdown via curl",
  zh: "通过 curl 获取 Markdown",
};

export const quickCurlHintCopy: LocalizedText = {
  en: "Need the raw guide instead of the landing page? Try the current host from your terminal.",
  zh: "如果你要原始指南而不是展示页，可以直接在终端请求当前访问地址。",
};

export const quickCommands: readonly string[] = [
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --help",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr --help --debug",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json auth status",
  "bytedcli update --check",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth get-codebase-jwt-token",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json codebase repo view \"byteapi/bytedcli\"",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json codebase mr view",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json codebase run list -R \"byteapi/bytedcli\"",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json codebase mr create -R \"byteapi/bytedcli\" --title \"feat: demo\"",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytedoc db get --service \"demo_orders\" --deploy-mode classic",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --http-debug rds list-starred-db --region cn --page-num 1 --page-size 10",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json tcc publish-detail \"https://cloud.bytedance.net/tcc/namespace/ocean.cloud.bot_adapter/publish-details/2829610337851552?x-resource-account=public&x-bc-region-id=bytedance\" --env prod",
  "NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json tcc approve-deployment \"https://cloud.bytedance.net/tcc/namespace/ocean.cloud.bot_adapter/publish-details/2829610337851552?x-resource-account=public&x-bc-region-id=bytedance\" --env prod",
];

export const howToUseTitle: LocalizedText = {
  en: "How to use bytedcli",
  zh: "如何使用 bytedcli",
};

export const howToUseCopy: LocalizedText = {
  en: "The landing page shows the product surface. The Markdown guide explains when to stay in CLI, when to switch to skills, and when MCP is the better fit.",
  zh: "展示页负责说明能力面。Markdown 指南负责解释什么时候继续用 CLI、什么时候切到 Skill、什么时候改走 MCP。",
};

export const resourcePathsTitle: LocalizedText = {
  en: "Docs and Entry Points",
  zh: "文档与入口",
};

export const resourcePathsCopy: LocalizedText = {
  en: "Start from the raw skill guide, the repository README, or the user-facing Lark document, depending on how you access bytedcli.",
  zh: "无论你通过哪种方式接入 bytedcli，都可以从原始 Skill 指南、仓库 README 或面向用户的飞书文档开始。",
};

export const ctaOpenSkill: LocalizedText = {
  en: "Open /SKILL.md",
  zh: "打开 /SKILL.md",
};

export const ctaOpenRepo: LocalizedText = {
  en: "Open repo",
  zh: "打开仓库",
};

export const resourceLinks: readonly WebsiteResourceLink[] = [
  {
    accent: "gold",
    title: {
      en: "/SKILL.md",
      zh: "/SKILL.md",
    },
    href: "/SKILL.md",
    note: {
      en: "Read the raw English guide that agents and curl clients receive.",
      zh: "查看 Agent 与 curl 客户端直接拿到的英文原始指南。",
    },
  },
  {
    accent: "mint",
    title: {
      en: "README.md",
      zh: "README.md",
    },
    href: "https://code.byted.org/byteapi/bytedcli",
    note: {
      en: "Repository source, CLI usage, changelog flow, and install entry points.",
      zh: "仓库源码、CLI 用法、变更记录流程与安装入口都在这里。",
    },
  },
  {
    accent: "sky",
    title: {
      en: "Lark Doc",
      zh: "飞书文档",
    },
    href: "https://bytedance.larkoffice.com/docx/PRoSdJR8NowW5gxguFGcm9HpnRb",
    note: {
      en: "User-facing installation and access guide for the wider ByteDance audience.",
      zh: "面向更广泛字节用户的安装与接入说明。",
    },
  },
];
