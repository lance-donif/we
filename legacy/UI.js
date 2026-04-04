/* UI.js - Web 端纯文字版 工作台逻辑 */

$(document).ready(function() {

  // 1. 模板主题切换逻辑
  $('.tpl-list .btn-pill').on('click', function() {
    // 自身高亮状态切换
    $('.tpl-list .btn-pill').removeClass('active');
    $(this).addClass('active');

    // 提取关联的类名
    let targetTpl = $(this).data('tpl');
    
    // 更新右侧预览容器的父类名，触发 CSS Variables 变换
    let $previewBox = $('#wx-render-box');
    $previewBox.removeClass('tpl-default tpl-letter tpl-pink').addClass(targetTpl);
  });

  // 2. 标题和底层字数简单映射关联
  $('#md-textarea').on('input', function() {
    let count = $(this).val().length;
    $('.pane-footer').html(`字数统计：${count} 字 &nbsp;&nbsp;&nbsp; 状态：编辑中...`);
  });

  $('.md-title-input').on('input', function() {
    $('.wx-title').text($(this).val() || '标题内容');
  });

  // 3. 完美兼容微信的富文本复制 — 与 md2wechat.cn 完全一致的 Clipboard API 方案
  $('#btn-copy').on('click', async function() {
    let $btn = $(this);
    let originalText = $btn.text();
    
    try {
      // 克隆 section.wx-post (微信信赖的标签)
      let sourceSection = document.querySelector('#wx-render-box .wx-post');
      let clone = sourceSection.cloneNode(true);
      
      // 当前主题
      let activeTpl = $('.tpl-list .btn-pill.active').data('tpl');
      let isLetter = activeTpl === 'tpl-letter';
      let isPink = activeTpl === 'tpl-pink';
      
      let themeAccent = isLetter ? '#b45309' : (isPink ? '#db2777' : '#16a34a');
      let themeText = isLetter ? '#4a4a4a' : (isPink ? '#4a5568' : '#3f3f3f');
      let themeBg = isLetter ? '#fdfbf7' : (isPink ? '#fff5f5' : '#ffffff');
      let themeQuoteBg = isLetter ? '#fef3c7' : (isPink ? '#fce7f3' : '#f0fdf4');
      let themeFont = "'PingFang SC', -apple-system-font, BlinkMacSystemFont, 'Helvetica Neue', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif";
      
      // 内联映射表 — 与 md2wechat 输出格式完全对齐
      const cssRules = {
        '.wx-title': `font-size: 22px; font-weight: bold; line-height: 1.4; margin: 1.5em 8px 0.75em 0px; padding: 0; color: #111; font-family: ${themeFont};`,
        '.wx-meta': `margin: 0 8px 32px; font-size: 15px; color: #94a3b8; font-family: ${themeFont};`,
        '.wx-author': `color: ${themeAccent}; margin-right: 12px;`,
        '.wx-date': 'color: #94a3b8;',
        '.wx-content': `font-size: 15px; line-height: 1.75; color: ${themeText}; font-family: ${themeFont}; letter-spacing: 0.1em;`,
        '.wx-h2': `font-size: 18px; margin: 2em 8px 0.75em 0px; padding: 0 0 0.5em 12px; border-left: 4px solid ${themeAccent}; font-weight: bold; line-height: 1.2; color: #111;`,
        '.wx-h2-decor': `display: none;`,
        '.wx-p': `margin: 1.2em 8px; text-align: justify; line-height: 1.75; font-family: ${themeFont}; font-size: 15px; letter-spacing: 0.1em; color: ${themeText}; overflow-wrap: break-word;`,
        '.wx-strong': `color: ${themeAccent}; font-weight: bold;`,
        '.wx-quote': `background-color: ${themeQuoteBg}; border-left: 3px solid ${themeAccent}; padding: 12px 16px; margin: 1.2em 8px; color: #666; font-size: 15px; display: block; border-radius: 0 8px 8px 0;`,
        '.wx-ul': `list-style: none; margin: 0 8px 1.5em; padding: 0; text-align: left; line-height: 1.75; font-family: ${themeFont}; font-size: 15px; color: #555;`,
        '.wx-li': `margin: 0.5em 0; padding-left: 1em;`
      };

      // 给最外层 section 打上背景色 — 这是微信能识别的关键
      clone.setAttribute('style', `background-color: ${themeBg}; border-radius: 24px; padding: 8px 12px; max-width: 680px; margin: 0 auto; width: 100%; box-sizing: border-box;`);

      // 遍历子元素应用内联样式
      $(clone).find('*').each(function() {
        for (let selector in cssRules) {
          if ($(this).is(selector)) {
            $(this).attr('style', cssRules[selector]);
          }
        }
      });
      
      // 生成最终 HTML 字符串
      let finalHTML = clone.outerHTML;
      
      // ====== 方案A: Clipboard API (md2wechat 使用的方案) ======
      if (navigator.clipboard && navigator.clipboard.write) {
        try {
          const htmlBlob = new Blob([finalHTML], { type: 'text/html' });
          const textBlob = new Blob([clone.innerText], { type: 'text/plain' });
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': htmlBlob,
              'text/plain': textBlob
            })
          ]);
          showToast('[ 复制成功！已写入富文本，请去微信公众号后台粘贴 ]');
          $btn.text('[ 复制成功 ✓ ]').css('color', '#10b981');
          setTimeout(() => { $btn.text(originalText).css('color', ''); }, 2500);
          return; // 成功就直接结束
        } catch(e) {
          console.warn('Clipboard API failed, falling back to execCommand:', e);
        }
      }
      
      // ====== 方案B: execCommand fallback (本地 file:// 协议) ======
      let tempDiv = document.createElement('div');
      tempDiv.contentEditable = 'true';
      tempDiv.style.cssText = 'position:fixed; left:-9999px; top:0; opacity:0;';
      tempDiv.innerHTML = finalHTML;
      document.body.appendChild(tempDiv);
      
      let selection = window.getSelection();
      let range = document.createRange();
      range.selectNodeContents(tempDiv);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
      document.body.removeChild(tempDiv);
      
      showToast('[ 复制成功！已写入富文本，请去微信公众号后台粘贴 ]');
      $btn.text('[ 复制成功 ✓ ]').css('color', '#10b981');

    } catch (err) {
      console.error('Copy failed:', err);
      showToast('[ 复制失败，请重试 ]');
    }

    setTimeout(() => { $btn.text(originalText).css('color', ''); }, 2500);
  });

  // Toast 辅助函数
  function showToast(msg) {
    let $toast = $('#toast-msg');
    $toast.text(msg).addClass('show');
    setTimeout(() => {
      $toast.removeClass('show');
    }, 3000);
  }

});
