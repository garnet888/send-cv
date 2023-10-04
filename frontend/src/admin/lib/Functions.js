export function getValueFromTree(item, pathname, key, subKey) {
  if (item.children) {
    return item.children.map((child) =>
      getValueFromTree(child, pathname, key, subKey)
    );
  } else {
    const _itemPath = "/admin" + item.path;

    if (String(pathname).search(_itemPath) > -1) {
      if (item[subKey]) {
        return item[subKey];
      } else {
        return item[key];
      }
    }
  }
}

export function getRouteFromTree(item, index, Route) {
  if (item.children) {
    return item.children.map((child) => getRouteFromTree(child, index, Route));
  } else {
    return (
      <Route
        key={index}
        path={item.path}
        element={item.component}
        loader={"Loading..."}
      />
    );
  }
}

export function checkMenuOpened(item, pathname, setIsOpened, setMenuIsActive) {
  if (item?.children) {
    item.children.map((child) =>
      checkMenuOpened(child, pathname, setIsOpened, setMenuIsActive)
    );
  } else {
    const itemPath = "/admin" + item?.path;

    if (String(pathname).search(itemPath) > -1) {
      setIsOpened(true);
      setMenuIsActive(true);
    }
  }
}
