export function onSelectPropType(
    props,
    propName,
    componentName,
    location,
    propFullName,
  ) {
    const prop = props[propName];
    const name = propFullName || propName;
    let error = null;
  
    if (prop && typeof prop !== 'function') {
      error = new Error(
        `Invalid ${location} \`${name}\` of type \`${typeof prop}\` supplied ` +
          `to \`${componentName}\`, expected \`function\`.`,
      );
    } else if (props.selectedIndex != null && prop == null) {
      error = new Error(
        `The ${location} \`${name}\` is marked as required in \`${componentName}\`, but ` +
          `its value is \`undefined\` or \`null\`.\n` +
          `\`onSelect\` is required when \`selectedIndex\` is also set. Not doing so will ` +
          `make the tabs not do anything, as \`selectedIndex\` indicates that you want to ` +
          `handle the selected tab yourself.`
      );
    }
  
    return error;
  }

  export function selectedIndexPropType(
    props,
    propName,
    componentName,
    location,
    propFullName,
  ) {
    const prop = props[propName];
    const name = propFullName || propName;
    let error = null;
  
    if (prop != null && typeof prop !== 'number') {
      error = new Error(
        `Invalid ${location} \`${name}\` of type \`${typeof prop}\` supplied to ` +
          `\`${componentName}\`, expected \`number\`.`,
      );
    } else if (props.defaultIndex != null && prop != null) {
      return new Error(
        `The ${location} \`${name}\` cannot be used together with \`defaultIndex\` ` +
          `in \`${componentName}\`.\n` +
          `Either remove \`${name}\` to let \`${componentName}\` handle the selected ` +
          `tab internally or remove \`defaultIndex\` to handle it yourself.`,
      );
    }
  
    return error;
  }