// 这是网站唯一需要经常编辑的文件。将引号中的占位文字替换成你的信息即可。
window.PROFILE_DATA = {
  name: "你的中文姓名",
  englishName: "Your English Name",
  identity: "你的当前身份，例如：某大学本科生 / 研究生 / 工程师",
  major: "你的专业或研究方向",
  bio: [
    "在这里填写第一段个人简介，例如你的学习、工作背景和关注的问题。",
    "在这里填写第二段个人简介；如果不需要第二段，直接删除这一行。"
  ],

  // 文件路径建议分别使用 images/avatar.jpg 和 data/cv.pdf。
  avatar: "images/avatar-placeholder.svg",
  cv: "",

  // 邮箱留空时，网页会显示“待补充”。
  email: "",
  githubUsername: "",
  domain: "",

  education: [
    {
      school: "学校名称",
      degree: "学位 · 专业",
      period: "20XX - 20XX",
      description: "可填写主修方向、导师、实验室或其他补充信息。"
    }
  ],

  projects: [
    {
      name: "项目名称",
      period: "20XX",
      role: "你在项目中的角色或使用的技术",
      description: "用一两句话介绍项目目标、你的贡献和成果。",
      links: [
        // 示例：{ label: "项目主页", url: "https://example.com" }
      ]
    }
  ],

  awards: [
    {
      name: "奖项名称",
      issuer: "颁发机构",
      period: "20XX",
      description: "可选的补充说明。"
    }
  ],

  // 建议采用 YYYY-MM-DD 格式，每次更新内容后修改。
  lastUpdated: "待补充"
};
