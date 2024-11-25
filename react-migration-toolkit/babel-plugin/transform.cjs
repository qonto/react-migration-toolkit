function transform(env) {
  const b = env.syntax.builders;

  function isReactBridge(node) {
    return node.type === 'ElementNode' && node.tag === 'ReactBridge';
  }

  function isHtmlElement(node) {
    return (
      node.type === 'ElementNode' &&
      !isReactBridge(node) &&
      /^[a-z]/.test(node.tag[0])
    );
  }

  function findAttribute(node, name) {
    return node.attributes.find((attr) => attr.name === name);
  }

  function convertAttributesToHash(attributes) {
    let pairs = attributes.map((attr) => {
      let value =
        attr.value.type === 'TextNode'
          ? b.string(attr.value.chars)
          : attr.value;
      return b.pair(attr.name, value);
    });
    return b.hash(pairs);
  }

  function buildCreateElement(tagOrComponent, propsHash, children = []) {
    let params = [tagOrComponent];
    if (propsHash || children.length > 0) {
      let childContent =
        children.length === 1
          ? children[0]
          : b.sexpr(b.path('array'), children);
      let pairs = children.length > 0 ? [b.pair('children', childContent)] : [];

      if (propsHash) {
        pairs.push(...propsHash.pairs);
      }

      let combinedHash = b.sexpr(b.path('hash'), null, b.hash(pairs));
      params.push(combinedHash);
    }
    return b.sexpr(b.path('create-element'), params);
  }

  function transformIfStatement(block) {
    let condition = block.params[0];
    let truthyChildren = collectChildComponents(block.program.body);

    let params = [condition, ...truthyChildren];

    if (block.inverse) {
      let falsyChildren = collectChildComponents(block.inverse.body);
      params.push(...falsyChildren);
    }

    return b.sexpr(b.path('if'), params);
  }

  function collectChildComponents(children) {
    return children
      .map((child) => {
        // Handle TextNodes
        if (child.type === 'TextNode') {
          if (child.chars.trim() === '') return null; // Ignore whitespace-only TextNodes

          /**
           * This trimming seems to be only necessary
           * when targetFormat is hbs instead of wire
           * */
          let leadingWhiteSpace = /^[ \t\r\n]+/;
          let trailingWhiteSpace = /[ \t\r\n]+$/;

          return b.string(
            child.chars
              .replace(leadingWhiteSpace, ' ')
              .replace(trailingWhiteSpace, ' '),
          );
        }

        // Handle Mustache Expressions
        if (
          child.type === 'MustacheStatement' &&
          child.path.original !== 'yield'
        ) {
          return b.sexpr(child.path, child.params, child.hash);
        }

        // Handle BlockStatements (e.g., {{#if ...}} and {{else}})
        if (child.type === 'BlockStatement' && child.path.original === 'if') {
          return transformIfStatement(child);
        }

        // Handle ReactBridge Nodes
        if (isReactBridge(child)) {
          let reactComponentAttr = findAttribute(child, '@reactComponent');
          if (!reactComponentAttr || !reactComponentAttr.value.path)
            return null;

          let reactComponent = reactComponentAttr.value.path.original;

          let childProps = findAttribute(child, '@props');
          let nestedChildren = collectChildComponents(child.children);

          return buildCreateElement(
            b.path(reactComponent),
            childProps?.value?.hash,
            nestedChildren,
          );
        }

        // Handle HTML Elements
        if (isHtmlElement(child)) {
          let tagName = child.tag;
          let attributesHash = convertAttributesToHash(child.attributes);
          let nestedChildren = collectChildComponents(child.children);

          return buildCreateElement(
            b.string(tagName),
            attributesHash,
            nestedChildren,
          );
        }

        return null;
      })
      .filter(Boolean);
  }

  function updatePropsAttribute(node, childrenElements) {
    let childContent =
      childrenElements.length === 1
        ? childrenElements[0]
        : b.sexpr(b.path('array'), childrenElements);
    let propsAttr = findAttribute(node, '@props');

    if (propsAttr) {
      propsAttr.value.hash.pairs.push(b.pair('children', childContent));
    } else {
      let propsMustache = b.mustache(
        b.path('hash'),
        null,
        b.hash([b.pair('children', childContent)]),
      );
      node.attributes.push(b.attr('@props', propsMustache));
    }
  }

  let visitor = {
    ElementNode(node) {
      if (!isReactBridge(node)) return;

      let reactComponentAttr = findAttribute(node, '@reactComponent');
      if (!reactComponentAttr || !reactComponentAttr.value.path) return;

      let childrenElements = collectChildComponents(node.children);

      if (childrenElements.length > 0) {
        updatePropsAttribute(node, childrenElements);
        node.children = [];
      }
    },
  };

  return {
    name: 'react-migration-toolkit-transform',
    visitor,
  };
}

module.exports = transform;
