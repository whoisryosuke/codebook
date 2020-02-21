---
id: mobile-sidebar
title: Hide Sidebar on Mobile
sidebar_label: Hide Sidebar on Mobile
---

Mobile sidebar - detects if window size is "mobile" (600px or below) (`isMobile`) and tracks sidebar visibility independently (`isVisible`).

Sidebar should default to `isMobile` as initial state (since it represents size of browser window on load or resize), then toggle the visibility if needed using a button and the `toggleVisibility()` function.

```jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import debounce from "../../helpers/debounce";

const MobileHeader = () => {
  const [isMobile, setMobile] = useState(false);
  const [isVisible, setVisibility] = useState(false);

  const resize = () => {
    let currentHideNav = window.innerWidth <= 600;
    // Are we mobile?
    setMobile(currentHideNav);
  };

  const toggleVisibility = () => {
    setVisibility(!isVisible);
  };

  useEffect(() => {
    window.addEventListener("resize", debounce(resize, 250));
    resize();
  });

  return (
    <Header
      mobile={isMobile}
      visible={isVisible}
      toggleVisibility={toggleVisibility}
    />
  );
};

export default MobileHeader;
```

## Using Semantic UI

```jsx
import React from "react";
import { Sidebar } from "semantic-ui-react";
import debounce from "../tools/debounce";

import DocSidebar from "./sidebar";
import "./layout.scss";
import "../../../dist/semantic.min.css";

class Layout extends React.Component {
  state = { visible: true };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  componentDidMount() {
    window.addEventListener("resize", debounce(this.resize.bind(this), 250));
    this.resize();
  }

  resize() {
    let currentHideNav = window.innerWidth <= 760;
    if (!currentHideNav !== this.state.visible) {
      this.setState({ visible: !currentHideNav });
    }
  }

  render() {
    const { children, className } = this.props;
    const { visible } = this.state;
    return (
      <>
        <Sidebar.Pushable as="section">
          <DocSidebar visible={visible} />
          <Sidebar.Pusher as="main" className={className}>
            <div className="ui text container">{children}</div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    );
  }
}
export default Layout;
```
