(function () {
  "use strict";

  const data = window.PROFILE_DATA || {};
  const placeholder = "待补充";

  function byId(id) {
    return document.getElementById(id);
  }

  function valueOrPlaceholder(value) {
    return typeof value === "string" && value.trim() ? value.trim() : placeholder;
  }

  function setText(id, value) {
    byId(id).textContent = valueOrPlaceholder(value);
  }

  function isFilled(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function safeExternalUrl(value) {
    if (!isFilled(value)) return "";
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
    } catch (_error) {
      return "";
    }
  }

  function appendLink(container, label, url) {
    if (!url) {
      const pending = document.createElement("span");
      pending.className = "pending-link";
      pending.textContent = label + "待补充";
      container.appendChild(pending);
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.textContent = label;
    if (/^https?:/i.test(url)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    container.appendChild(link);
  }

  function renderHeader() {
    setText("name", data.name);
    setText("english-name", data.englishName);
    setText("identity", data.identity);
    setText("major", data.major);
    setText("last-updated", data.lastUpdated);

    const pageTitle = [data.name, data.englishName].filter(isFilled).join(" | ");
    document.title = pageTitle || "个人学术主页";

    const avatar = byId("avatar");
    avatar.src = isFilled(data.avatar) ? data.avatar : "images/avatar-placeholder.svg";
    avatar.alt = valueOrPlaceholder(data.name) + "的头像";
    avatar.addEventListener("error", function () {
      avatar.src = "images/avatar-placeholder.svg";
    }, { once: true });

    const bio = byId("bio");
    const paragraphs = Array.isArray(data.bio) ? data.bio.filter(isFilled) : [];
    (paragraphs.length ? paragraphs : ["个人简介待补充。"]).forEach(function (text) {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      bio.appendChild(paragraph);
    });

    const email = byId("email");
    if (isFilled(data.email)) {
      const emailLink = document.createElement("a");
      emailLink.href = "mailto:" + data.email.trim();
      emailLink.textContent = data.email.trim();
      email.replaceChildren(emailLink);
    } else {
      email.textContent = placeholder;
    }

    const links = byId("profile-links");
    appendLink(links, "简历", isFilled(data.cv) ? data.cv.trim() : "");
    appendLink(links, "邮箱", isFilled(data.email) ? "mailto:" + data.email.trim() : "");
    appendLink(
      links,
      "GitHub",
      isFilled(data.githubUsername)
        ? "https://github.com/" + encodeURIComponent(data.githubUsername.trim())
        : ""
    );
    appendLink(links, "个人域名", safeExternalUrl(data.domain));
  }

  function createTextElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function renderEntries(containerId, items, fields) {
    const container = byId(containerId);
    const entries = Array.isArray(items) ? items : [];

    if (!entries.length) {
      container.appendChild(createTextElement("p", "placeholder-entry", "内容待补充。"));
      return;
    }

    entries.forEach(function (item) {
      const article = document.createElement("article");
      article.className = "entry";
      article.appendChild(createTextElement("h3", "entry-title", valueOrPlaceholder(item[fields.title])));

      if (isFilled(item[fields.period])) {
        article.appendChild(createTextElement("p", "entry-meta", item[fields.period].trim()));
      }

      if (fields.subtitle && isFilled(item[fields.subtitle])) {
        article.appendChild(createTextElement("p", "entry-subtitle", item[fields.subtitle].trim()));
      }

      if (isFilled(item.description)) {
        article.appendChild(createTextElement("p", "entry-description", item.description.trim()));
      }

      if (fields.links && Array.isArray(item.links) && item.links.length) {
        const linkRow = document.createElement("p");
        linkRow.className = "entry-links";
        item.links.forEach(function (itemLink, index) {
          const url = safeExternalUrl(itemLink.url);
          if (!url) return;
          if (linkRow.childNodes.length) linkRow.append(" | ");
          appendLink(linkRow, valueOrPlaceholder(itemLink.label), url);
        });
        if (linkRow.childNodes.length) article.appendChild(linkRow);
      }

      container.appendChild(article);
    });
  }

  renderHeader();
  renderEntries("education-list", data.education, {
    title: "school",
    subtitle: "degree",
    period: "period"
  });
  renderEntries("projects-list", data.projects, {
    title: "name",
    subtitle: "role",
    period: "period",
    links: true
  });
  renderEntries("awards-list", data.awards, {
    title: "name",
    subtitle: "issuer",
    period: "period"
  });
}());
