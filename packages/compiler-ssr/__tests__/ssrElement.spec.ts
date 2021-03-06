import { getCompiledString } from './utils'

describe('ssr: element', () => {
  test('basic elements', () => {
    expect(getCompiledString(`<div></div>`)).toMatchInlineSnapshot(
      `"\`<div></div>\`"`
    )
    expect(getCompiledString(`<div/>`)).toMatchInlineSnapshot(
      `"\`<div></div>\`"`
    )
  })

  test('static attrs', () => {
    expect(
      getCompiledString(`<div id="foo" class="bar"></div>`)
    ).toMatchInlineSnapshot(`"\`<div id=\\"foo\\" class=\\"bar\\"></div>\`"`)
  })

  test('nested elements', () => {
    expect(
      getCompiledString(`<div><span></span><span></span></div>`)
    ).toMatchInlineSnapshot(`"\`<div><span></span><span></span></div>\`"`)
  })

  test('void element', () => {
    expect(getCompiledString(`<input>`)).toMatchInlineSnapshot(`"\`<input>\`"`)
  })

  test('v-html', () => {
    expect(getCompiledString(`<div v-html="foo"/>`)).toMatchInlineSnapshot(
      `"\`<div>\${_ctx.foo}</div>\`"`
    )
  })

  test('v-text', () => {
    expect(getCompiledString(`<div v-text="foo"/>`)).toMatchInlineSnapshot(
      `"\`<div>\${_interpolate(_ctx.foo)}</div>\`"`
    )
  })

  test('<textarea> with dynamic value', () => {
    expect(getCompiledString(`<textarea :value="foo"/>`)).toMatchInlineSnapshot(
      `"\`<textarea>\${_interpolate(_ctx.foo)}</textarea>\`"`
    )
  })

  test('<textarea> with static value', () => {
    expect(
      getCompiledString(`<textarea value="fo&gt;o"/>`)
    ).toMatchInlineSnapshot(`"\`<textarea>fo&gt;o</textarea>\`"`)
  })
})
