function formatRelativeTime(timestamp) {
  const now = Date.now();

  const sec = Math.floor((now - timestamp) / 1000);
  if (sec < 60) {
    return "Just now";
  }

  const min = Math.floor(sec / 60);
  if (min < 60) {
    return `${min} minute${min === 1 ? "" : "s"} ago`;
  }

  const hour = Math.floor(min / 60);
  if (hour < 24) {
    return `${hour} hour${hour === 1 ? "" : "s"} ago`;
  }

  const day = Math.floor(hour / 24);
  if (day < 30) {
    return `${day} day${day === 1 ? "" : "s"} ago`;
  }

  const month = Math.floor(day / 30);
  return `${month} month${month === 1 ? "" : "s"} ago`;
}

class ZenGroups {
  #initialized = false;
  #activeGroup = null;
  #iconsPrefName = "mod.zen-groups.icon.emoji";
  #popup = null;
  folderSVG = new DOMParser().parseFromString(
    `
    <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="-67.409 -14.145 29.279 28.92">
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" x1="-53.05" y1="-3.8" x2="-53.05" y2="8.998" id="gradient-1">
          <stop offset="0" style="stop-color: rgb(255, 255, 255);"/>
          <stop offset="1" style="stop-color: rgb(0% 0% 0%)"/>
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" x1="-40.286" y1="-3.091" x2="-40.286" y2="13.31" id="gradient-0" gradientTransform="matrix(1, 0, 0, 1, -12.717999, -4.409)">
          <stop offset="0" style="stop-color: rgb(255, 255, 255);"/>
          <stop offset="1" style="stop-color: rgb(0% 0% 0%)"/>
        </linearGradient>
      </defs>
    <!--Back Folder (path)-->
      <path shape-rendering="geometricPrecision" d="M -61.3 -5.25 C -61.3 -6.492 -60.293 -7.5 -59.05 -7.5 L -55.102 -7.5 C -54.591 -7.5 -54.096 -7.326 -53.697 -7.007 L -52.84 -6.321 C -52.175 -5.79 -51.349 -5.5 -50.498 -5.5 L -47.05 -5.5 C -45.807 -5.5 -44.8 -4.492 -44.8 -3.25 L -44.731 4.42 L -44.708 6.651 C -44.708 7.894 -45.715 8.901 -46.958 8.901 L -58.958 8.901 C -60.201 8.901 -61.208 7.894 -61.208 6.651 L -61.3 4.752 L -61.3 -5.25 Z" style="stroke-width: 1.25px; transform-box: fill-box; transform-origin: 50% 50%; fill: var(--zen-workspace-color-bg); stroke: var(--zen-workspace-color-stroke);">
        <animateTransform begin="0s" type="skewX" additive="sum" attributeName="transform" values="0;17" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
        <animateTransform begin="0s" type="translate" additive="sum" attributeName="transform" values="0 0;-1 -1.2" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
        <animateTransform begin="0s" type="scale" additive="sum" attributeName="transform" values="1 1;0.95 0.95" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
      </path>
      <path shape-rendering="geometricPrecision" d="M -61.3 -5.25 C -61.3 -6.492 -60.293 -7.5 -59.05 -7.5 L -55.102 -7.5 C -54.591 -7.5 -54.096 -7.326 -53.697 -7.007 L -52.84 -6.321 C -52.175 -5.79 -51.349 -5.5 -50.498 -5.5 L -47.05 -5.5 C -45.807 -5.5 -44.8 -4.492 -44.8 -3.25 L -44.731 4.42 L -44.708 6.651 C -44.708 7.894 -45.715 8.901 -46.958 8.901 L -58.958 8.901 C -60.201 8.901 -61.208 7.894 -61.208 6.651 L -61.3 4.752 L -61.3 -5.25 Z" style="stroke-width: 1.25; fill-opacity: 0.15; fill: url(&quot;#gradient-0&quot;); transform-origin: -53.004px 0.701px;">
        <animateTransform begin="0s" type="skewX" additive="sum" attributeName="transform" values="0;17" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
        <animateTransform begin="0s" type="translate" additive="sum" attributeName="transform" values="0 0;-1 -1.2" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
        <animateTransform begin="0s" type="scale" additive="sum" attributeName="transform" values="1 1;0.95 0.95" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
      </path>
    <!--Front Folder (rect)-->
      <rect shape-rendering="geometricPrecision" x="-61.301" y="-3.768" width="16.5" height="12.798" rx="2.25" style="stroke-width: 1.25px; transform-box: fill-box; transform-origin: 50% 50%; fill: var(--zen-workspace-color-fg); stroke: var(--zen-workspace-color-stroke);" id="object-0">
        <animateTransform begin="0s" type="skewX" additive="sum" attributeName="transform" values="0;-17" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
        <animateTransform begin="0s" type="translate" additive="sum" attributeName="transform" values="0 0;3 -0.5" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
        <animateTransform begin="0s" type="scale" additive="sum" attributeName="transform" values="1 1;0.9 0.9" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
      </rect>
    <!--Emoji (text)-->
      <text shape-rendering="geometricPrecision" x="-53.051" y="2.631" fill="black" font-size="8" text-anchor="middle" dominant-baseline="middle">
        <animateTransform begin="0s" type="skewX" additive="sum" attributeName="transform" values="0;-17" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
        <animateTransform begin="0s" type="translate" additive="sum" attributeName="transform" values="0 0;-1 0" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
        <animateTransform begin="0s" type="scale" additive="sum" attributeName="transform" values="1 1;0.9 0.9" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
        </text>
    <!--End Emoji (text)-->
      <rect shape-rendering="geometricPrecision" x="-61.3" y="-3.8" width="16.5" height="12.798" style="stroke-width: 1.25; fill-opacity: 0.15; transform-origin: -53.05px 2.599px; fill: url(&quot;#gradient-1&quot;);" id="rect-1" rx="2.25">
        <animateTransform begin="0s" type="skewX" additive="sum" attributeName="transform" values="0;-17" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
        <animateTransform begin="0s" type="translate" additive="sum" attributeName="transform" values="0 0;3 -0.5" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
        <animateTransform begin="0s" type="scale" additive="sum" attributeName="transform" values="1 1;0.9 0.9" dur="0.3s" fill="freeze" keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 0.58 1"/>
      </rect>
    </svg>
    `,
    "image/svg+xml",
  ).documentElement;

  constructor() {}

  #patchTabGroup() {
    customElements.whenDefined("tab-group").then(() => {
      const ctor = customElements.get("tab-group");
      if (!ctor) return;

      // Modify the markup of the tab group
      ctor.markup = `
        <hbox class="tab-group-label-container" pack="center">
          <html:div class="tab-group-icon"/>
          <label class="tab-group-label" role="button"/>
          <toolbarbutton class="toolbarbutton-1 tab-group-tabs-button" tooltiptext="Group tabs button"/>
          <toolbarbutton class="toolbarbutton-1 tab-group-action-button" tooltiptext="Group action button"/>
        <html:slot/>
        </hbox>
        <html:div class="tab-group-container">
          <html:div class="zen-tab-group-start"/>
        </html:div>
      `;
      // Disable the default click handler
      ctor.prototype.on_click = this.#onLabelContainerClick.bind(this);
      ctor.prototype.on_TabSelect = this.#onTabSelect.bind(this); // TODO: fix

      const self = this;

      Object.defineProperty(ctor.prototype, "iconState", {
        get() {
          return this.querySelector(".tab-group-icon").getAttribute(
            "icon-state",
          );
        },
        set(value) {
          this.querySelector(".tab-group-icon").setAttribute(
            "icon-state",
            value,
          );
        },
      });

      Object.defineProperty(ctor.prototype, "collapsed", {
        get() {
          return this.hasAttribute("collapsed");
        },
        async set(value) {
          if (!!value === this.collapsed) {
            return;
          }

          const updateCollapsedState = (val) => {
            this.toggleAttribute("collapsed", val);
            const eventName = val ? "TabGroupCollapse" : "TabGroupExpand";
            this.dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
          };

          const hasActive = this.hasAttribute("has-active");
          console.log("Tab group" + this.id + " current value: " + value);

          if (value) {
            // Collapse
            if (!hasActive) {
              // await Promise.all([
              //   self.#animateTabGroupIcon(this, "close"),
              //   self.#animateGroupCollapse(this),
              // ]);
              await self.#animateGroupCollapse(this);
              await self.#animateTabGroupIcon(this, "close");
              console.log("ANIMATION COLLAPSE PLAYED");
            }

            updateCollapsedState(value);
          } else {
            // Expand
            updateCollapsedState(value);

            if (!hasActive) {
              // await Promise.all([
              //   self.#animateTabGroupIcon(this, "open"),
              //   self.#animateGroupExpand(this),
              // ]);
              await self.#animateTabGroupIcon(this, "open");
              await self.#animateGroupExpand(this);
              console.log("ANIMATION EXPAND PLAYED");
            }
          }
        },
      });
    });
  }

  #patchUnload() {
    const origUnload = gBrowser.explicitUnloadTabs.bind(gBrowser);
    gBrowser.explicitUnloadTabs = async (tabs) => {
      origUnload(tabs);
      for (const tab of tabs) {
        const group = tab.group;
        if (!group) continue;

        await this.#animateTabCollapse(tab).then(() => {
          if (!this._hasActiveTabs(group) && group.hasAttribute("has-active")) {
            group.collapsed = true;
            group.removeAttribute("has-active");
          }
        });
      }
    };
  }

  #patchZenCommandSet() {
    const zenCommands = document.getElementById("zenCommandSet");
    const tabGroupCommands = [
      '<command id="cmd_zenTabGroupsRenameGroup"/>',
      '<command id="cmd_zenTabGroupsChangeIcon"/>',
      '<command id="cmd_zenTabGroupsUngroupGroup"/>',
      '<command id="cmd_zenTabGroupsDeleteGroup"/>',
    ];
    for (const command of tabGroupCommands) {
      zenCommands.appendChild(window.MozXULElement.parseXULToFragment(command));
    }

    zenCommands.addEventListener("command", (event) => {
      switch (event.target.id) {
        case "cmd_zenTabGroupsRenameGroup":
          const label = this.#activeGroup.querySelector(".tab-group-label");
          const originalText = label.textContent;

          const input = document.createElement("input");
          input.id = "tab-group-rename-input";
          input.value = originalText;
          const labelEditing = (saveChanges) => {
            if (saveChanges) {
              const newValue = input.value.trim();
              if (newValue.length > 0 && newValue !== originalText) {
                this.#activeGroup.label = newValue;
              } else {
                label.textContent = originalText;
              }
            } else {
              label.textContent = originalText;
            }
            input.remove();
          };

          input.addEventListener("keydown", (event) => {
            switch (event.key) {
              case "Enter":
                labelEditing(true);
                break;
              case "Escape":
                labelEditing(false);
                break;
            }
          });

          input.addEventListener("blur", () => {
            labelEditing(false);
          });

          label.textContent = "";
          label.appendChild(input);

          input.focus();
          input.select();
          break;
        case "cmd_zenTabGroupsChangeIcon":
          this.#changeTabGroupIcon(this.#activeGroup);
          break;
        case "cmd_zenTabGroupsUngroupGroup":
          this.#activeGroup.ungroupTabs({
            isUserTriggered: true,
          });
          break;
        case "cmd_zenTabGroupsDeleteGroup":
          gBrowser.removeTabGroup(this.#activeGroup);
          break;
      }
    });
  }

  init() {
    if (this.#initialized) return;
    this.#initialized = true;
    console.log("[ZenGroups] Init");
    this.#initTabGroupHandlers();
    this.#createTabGroupActionPopup();
    this.#createTabGroupTabsPopup();
    this.#patchTabGroup();
    this.#patchUnload();

    this.#patchZenCommandSet();
  }

  #initTabGroupHandlers() {
    window.addEventListener(
      "TabGroupCreate",
      this.#onTabGroupCreate.bind(this),
    );
    window.addEventListener(
      "TabGroupRemoved",
      this.#onTabGroupRemoved.bind(this),
    );
    window.addEventListener("TabGrouped", this.#onTabGrouped.bind(this));
    window.addEventListener("TabUngrouped", this.#onTabUngrouped.bind(this));
    window.addEventListener(
      "TabGroupExpand",
      this.#onTabGroupExpand.bind(this),
    );
    window.addEventListener(
      "TabGroupCollapse",
      this.#onTabGroupCollapse.bind(this),
    );
    gBrowser.tabContainer.addEventListener(
      "click",
      this.#onTabResetButtonClick.bind(this),
    );
  }

  _hasActiveTabs(group) {
    return group.tabs.some((tab) => !tab.hasAttribute("pending"));
  }

  _resetTabsStyle(group) {
    for (const tab of group.tabs) {
      tab.style.removeProperty("visibility");
      const resetButton = tab.querySelector(".tab-reset-button");
      resetButton.style.removeProperty("display");
    }
  }

  _updateTabs(group) {
    const hasActive = group.hasAttribute("has-active");

    this._resetTabsStyle(group);

    for (const tab of group.tabs) {
      const resetButton = tab.querySelector(".tab-reset-button");

      let shouldBeHidden = false;
      if (hasActive) {
        shouldBeHidden = tab.hasAttribute("pending");
      }

      if (shouldBeHidden) {
        tab.style.setProperty("visibility", "collapse");
      } else if (hasActive) {
        resetButton.style.display = "block";
      }
    }
  }

  #setupTabGroup(group) {
    const labelContainer = group.querySelector(".tab-group-label-container");

    this.#setupTabGroupIcon(labelContainer, group);
    this.#setupTabGroupButtons(labelContainer, group);

    // FIXME: find better way to handle this
    // group.addEventListener("mouseenter", (event) => {
    //   if (!group.collapsed) return;
    //   this.mouseTimer = setTimeout(() => {
    //     this.onTabsButtonClick(event);
    //   }, 200);
    // });
    // group.addEventListener("mouseleave", (event) => {
    //   clearTimeout(this.mouseTimer);
    //   if (!group.collapsed) return;
    //   this.mouseTimer = setTimeout(() => {
    //     this.onTabsButtonClick(event);
    //   }, 200);
    // });

    // INFO: idk use labelContainer or just label like FF does
    // labelContainer.addEventListener(
    //   "click",
    //   this.#onLabelContainerClick.bind(this),
    // );
  }

  #setupTabGroupIcon(labelContainer, group) {
    const iconContainer = labelContainer.querySelector(".tab-group-icon");
    if (iconContainer.querySelector("svg")) return;

    const svgElem = this.folderSVG.cloneNode(true);
    iconContainer.appendChild(svgElem);

    // Save the original values of the animations
    svgElem
      .querySelectorAll("animate, animateTransform, animateMotion")
      .forEach((anim) => {
        const vals = anim.getAttribute("values");
        if (vals) {
          anim.dataset.origValues = vals;
        }
      });

    iconContainer.addEventListener("dblclick", (event) => {
      event.preventDefault();
      this.#changeTabGroupIcon(group);
    });

    // Load saved emoji
    const icon = this.#loadUserTabGroupIcon(group);
    if (icon) {
      this.#setTabGroupIcon(group, icon);
    }

    group.iconState = group.collapsed ? "close" : "open";
    console.log("Icon init state: " + group.iconState);
    this.#animateTabGroupIcon(group, group.iconState, false);
  }

  #setupTabGroupButtons(labelContainer) {
    const actionButton = labelContainer.querySelector(
      ".tab-group-action-button",
    );
    const tabsButton = labelContainer.querySelector(".tab-group-tabs-button");

    actionButton.addEventListener("click", this.onActionButtonClick.bind(this));
    tabsButton.addEventListener("click", this.onTabsButtonClick.bind(this));
  }

  onActionButtonClick(event) {
    event.stopPropagation();
    this.#activeGroup = event.currentTarget.closest("tab-group");

    const popup = document.getElementById("tab-group-action-popup");
    const target = event.target;
    target.setAttribute("open", true);

    const handlePopupHidden = (event) => {
      if (event.target !== popup) return;
      target.removeAttribute("open");
      popup.removeEventListener("popuphidden", handlePopupHidden);
    };

    popup.addEventListener("popuphidden", handlePopupHidden);
    popup.openPopup(target, "after_start");
  }

  onTabsButtonClick(event) {
    event.stopPropagation();

    switch (event.type) {
      case "mouseenter":
        this.#activeGroup = event.target;
        break;
      case "mouseleave":
        this.#activeGroup = null;
        if (this.#popup.matches(":hover")) return;
        this.#popup.hidePopup();
        break;
      default:
        this.#activeGroup = event.currentTarget.closest("tab-group");
        break;
    }

    this.#populateTabsList();

    const search = this.#popup.querySelector("#zen-group-tabs-list-search");
    search.placeholder = `Search ${this.#activeGroup.name}...`;
    const tabsList = this.#popup.querySelector("#zen-group-tabs-list");

    search.addEventListener("input", () => {
      const query = search.value.toLowerCase();
      for (const item of tabsList.children) {
        item.hidden = !item.getAttribute("data-label").includes(query);
      }
    });

    const target = event.target;
    target.setAttribute("open", true);

    const handlePopupHidden = (event) => {
      if (event.target !== this.#popup) return;
      search.value = "";
      target.removeAttribute("open");
      this.#popup.removeEventListener("popuphidden", handlePopupHidden);
    };

    this.#popup.addEventListener("popuphidden", handlePopupHidden);
    this.#popup.openPopup(target, "after_start");
  }

  #createTabGroupActionPopup() {
    const popupSet = document.querySelector("#mainPopupSet");
    if (popupSet.querySelector("#tab-group-action-popup")) return;

    const popup = window.MozXULElement.parseXULToFragment(
      `
      <menupopup id="tab-group-action-popup">
        <menuitem id="zenTabGroupsRenameGroup" label="Rename" tooltiptext="Rename Group" command="cmd_zenTabGroupsRenameGroup"/>
        <menuitem id="zenTabGroupsChangeIcon" label="Change Icon" tooltiptext="Change Icon" command="cmd_zenTabGroupsChangeIcon"/>
        <menuitem id="zenTabGroupsUngroupGroup" label="Ungroup" tooltiptext="Ungroup Group" command="cmd_zenTabGroupsUngroupGroup"/>
        <menuitem id="zenTabGroupsDeleteGroup" label="Delete" tooltiptext="Delete Group" command="cmd_zenTabGroupsDeleteGroup"/>
      </menupopup>
      `,
    ).cloneNode(true);

    popupSet.appendChild(popup);
  }

  #createTabGroupTabsPopup() {
    const popupSet = document.querySelector("#mainPopupSet");
    if (popupSet.querySelector("#tab-group-tabs-popup")) return;
    const popup = window.MozXULElement.parseXULToFragment(
      `
      <panel id="tab-group-tabs-popup" type="arrow" orient="vertical">
      <hbox class="tabs-list-header">
        <image class="tabs-list-icon" src="chrome://global/skin/icons/search-glass.svg"/>
        <html:input id="zen-group-tabs-list-search" placeholder="Search tabs" type="search"/>
      </hbox>
        <scrollbox class="tabs-list-scrollbox" flex="1">
          <vbox id="zen-group-tabs-list" class="panel-list"></vbox>
        </scrollbox>
      </panel>
      `,
    ).cloneNode(true);

    popupSet.appendChild(popup);

    this.#popup = document.getElementById("tab-group-tabs-popup");

    this.#popup.addEventListener("mouseenter", () => {
      clearTimeout(this.popupTimer);
    });

    this.#popup.addEventListener("mouseleave", () => {
      this.popupTimer = setTimeout(() => {
        if (this.#popup.matches(":hover")) return;
        this.#popup.hidePopup();
      }, 200);
    });
  }

  #populateTabsList() {
    const tabsList = this.#popup.querySelector("#zen-group-tabs-list");
    tabsList.replaceChildren();

    for (const tab of this.#activeGroup.tabs) {
      if (tab.hidden) continue;

      const item = document.createElement("div");
      item.className = "tabs-list-item";

      const background = document.createElement("div");
      background.className = "tabs-list-item-background";

      const content = document.createElement("div");
      content.className = "tabs-list-item-content";

      const icon = document.createElement("img");
      icon.className = "tabs-list-item-icon";
      let iconURL =
        gBrowser.getIcon(tab) ||
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3C/svg%3E";
      if (iconURL) {
        icon.src = iconURL;
      }

      const labelsContainer = document.createElement("div");
      labelsContainer.className = "tabs-list-item-labels";

      const mainLabel = document.createElement("div");
      mainLabel.className = "tabs-list-item-label";
      mainLabel.textContent = tab.label;

      const secondaryLabel = document.createElement("div");
      secondaryLabel.className = "tab-list-item-secondary-label";
      secondaryLabel.textContent = formatRelativeTime(tab.lastAccessed);

      labelsContainer.append(mainLabel, secondaryLabel);
      content.append(icon, labelsContainer);
      item.append(background, content);

      if (tab.selected) {
        item.setAttribute("selected", "true");
      }

      item.setAttribute("data-label", tab.label.toLowerCase());

      item.addEventListener("click", () => {
        gBrowser.selectedTab = tab;
        this.#popup.hidePopup();
      });

      tabsList.appendChild(item);
    }
  }

  #onTabResetButtonClick(event) {
    if (!event.target.classList.contains("tab-reset-button")) return;
    const tab = event.target.closest(".tab-stack").parentElement;
    if (tab?.pinned) return;

    event.preventDefault();

    const group = tab.group;
    if (!group) return;

    gBrowser.explicitUnloadTabs([tab]);
  }

  async #onTabSelect(event) {
    const group = event.target?.group;
    if (group.collapsed) {
      group.setAttribute("has-active", true);
      group.collapsed = false;
    }

    await this.#animateTabExpand(event.target).then(() => {
      this._updateTabs(group);
    });
  }

  #onTabGroupCreate(event) {
    this.#setupTabGroup(event.target);
  }

  #onTabGroupRemoved(event) {
    this.#removeUserTabGroupIcon(event.target);
  }

  #onTabGrouped(event) {
    const tab = event.detail;
    const group = event.target;

    if (tab.selected && group.collapsed && !group.hasAttribute("has-active")) {
      group.toggleAttribute("has-active");
      group.collapsed = false;
    }

    this._updateTabs(group);
  }

  #onTabUngrouped(event) {
    const tab = event.detail;
    const group = event.target;

    tab.style.removeProperty("visibility");
    tab.style.removeProperty("z-index");
    tab.style.removeProperty("margin-top");
    tab.querySelector(".tab-reset-button").style.removeProperty("display");
    if (!this._hasActiveTabs(group) && group.hasAttribute("has-active")) {
      group.removeAttribute("has-active");
      group.removeAttribute("was-collapsed");
      group.collapsed = true;
    }
  }

  #onTabGroupExpand(event) {
    const group = event.target;
  }

  #onTabGroupCollapse(event) {
    const group = event.target;
  }

  async #animateGroupExpand(group) {
    const tabHeight = 36;
    let animations = [];
    const tabsAnimate = group.tabs.filter((tab) => tab.hasAttribute("pending"));

    tabsAnimate.forEach((tab) => {
      tab.style.marginTop = `-${tabHeight}px`;
      tab.style.zIndex = -1;
      tab.style.visibility = "";
    });

    animations = tabsAnimate.map((tab) => {
      return gZenUIManager.motion.animate(
        tab,
        { marginTop: "0px", zIndex: 0 },
        { duration: 0.15, ease: "linear" },
      );
    });

    await Promise.all(animations);
  }

  async #animateGroupCollapse(group) {
    const tabHeight = 36;
    let animations = [];
    const tabsAnimate = group.tabs.filter((tab) => tab.hasAttribute("pending"));

    animations = tabsAnimate.map((tab) => {
      return gZenUIManager.motion
        .animate(
          tab,
          { marginTop: `-${tabHeight}px`, zIndex: -1 },
          { duration: 0.15, ease: "linear" },
        )
        .then(() => {
          tab.style.visibility = "collapse";
        });
    });

    await Promise.all(animations);
  }

  async #animateTabExpand(tab) {
    const tabHeight = 36;

    tab.style.marginTop = `-${tabHeight}px`;
    tab.style.zIndex = -1;
    tab.style.visibility = "visible";

    await gZenUIManager.motion.animate(
      tab,
      { marginTop: "0px", zIndex: 0 },
      { duration: 0.15, ease: "linear" },
    );
  }

  async #animateTabCollapse(tab) {
    const tabHeight = 36;
    await gZenUIManager.motion
      .animate(
        tab,
        { marginTop: `-${tabHeight}px`, zIndex: -1 },
        { duration: 0.15, ease: "linear" },
      )
      .then(() => {
        tab.style.visibility = "collapse";
        tab.style.zIndex ="";
        tab.style.marginTop = "";
      });
  }

  async #onLabelContainerClick(event) {
    if (event.button !== 0) return;
    const group = event.target.group;

    if (!this._hasActiveTabs(group)) {
      this._resetTabsStyle(group);
      group.collapsed = !group.collapsed;
      return;
    }

    group.toggleAttribute("has-active");

    if (group.hasAttribute("has-active")) {
      await Promise.all([
        this.#animateGroupCollapse(group),
        this.#animateTabGroupIcon(group, "close"),
      ]);
    } else {
      await Promise.all([
        this.#animateGroupExpand(group),
        this.#animateTabGroupIcon(group, "open"),
      ]);
    }

    this._updateTabs(group);
  }

  async #animateTabGroupIcon(group, state = "auto", play = true) {
    const svg = group.querySelector("svg");
    if (!svg) return;
    console.log("Icon state: " + state);

    if (group.iconState === state) return;

    group.iconState = state;

    const isCollapsed = group.collapsed;
    const animStates = {
      open: 0.3,
      close: 0,
      auto: isCollapsed ? 0 : 0.3,
    };

    svg.unpauseAnimations();

    if (!play) {
      svg.pauseAnimations();
      svg.setCurrentTime(animStates[state]);
      return;
    }

    const animations = svg.querySelectorAll(
      "animate, animateTransform, animateMotion",
    );

    animations.forEach((anim) => {
      const origValues = anim.dataset.origValues;
      const [fromValue, toValue] = origValues.split(";");

      // Select animation state
      let newValues = {
        open: `${fromValue};${toValue}`,
        close: `${toValue};${fromValue}`,
        auto: isCollapsed
          ? `${toValue};${fromValue}`
          : `${fromValue};${toValue}`,
      };

      anim.setAttribute("values", newValues[state]);
      anim.beginElement();
    });
  }

  #changeTabGroupIcon(group) {
    if (!group) return;

    gZenEmojiPicker
      .open(group)
      .then((icon) => {
        this.#setTabGroupIcon(group, icon);
        this.#saveUserTabGroupIcon(group, icon);
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  }

  #setTabGroupIcon(group, icon) {
    const svgText = group.querySelector(".tab-group-icon svg text");
    if (!svgText) return;

    // Save animations
    const animations = Array.from(svgText.children);
    // Change group icon
    svgText.textContent = icon;
    // Restore animations
    animations.forEach((anim) => svgText.appendChild(anim));
  }
  #getUserTabGroupIcons() {
    const jsonStr = Services.prefs.getStringPref(this.#iconsPrefName);
    return jsonStr ? JSON.parse(jsonStr) : {};
  }
  #saveUserTabGroupIcon(group, icon) {
    const icons = this.#getUserTabGroupIcons();
    icons[group.id] = icon;
    Services.prefs.setStringPref(this.#iconsPrefName, JSON.stringify(icons));
  }

  #loadUserTabGroupIcon(group) {
    const icons = this.#getUserTabGroupIcons();
    return icons[group.id] || "";
  }

  #removeUserTabGroupIcon(group) {
    const icons = this.#getUserTabGroupIcons();
    delete icons[group.id];
    Services.prefs.setStringPref(this.#iconsPrefName, JSON.stringify(icons));
  }
}

(function () {
  if (!globalThis.zenGroupsInstance) {
    window.addEventListener(
      "load",
      () => {
        globalThis.zenGroupsInstance = new ZenGroups();
        globalThis.zenGroupsInstance.init();
      },
      { once: true },
    );
  }
})();
