/**
 * Paper Cut Art Base System
 * Focuses on True 3D depth, Sticker borders, and character features.
 */

const SANS = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif"
const SERIF = "'Songti SC','STSong','SimSun','Times New Roman',serif"

export function createPaperCutTemplate(config) {
  const { id, name, className, palette, cssText } = config

  return {
    id,
    name,
    className,
    cssText,
    copyRichText(clone) {
      const p = palette[0]

      // 1. Root Container (The Matte Art Paper)
      clone.setAttribute('style', `
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
        background-color: ${p.bg};
        color: #444;
        box-sizing: border-box;
        font-family: ${SERIF};
        padding: 20px 0 60px;
        position: relative;
        overflow: hidden;
      `.trim().replace(/\n\s*/g, ' '))

      // 2. Sections (3D Layered Paper Cutouts)
      const sections = clone.querySelectorAll('.wx-section')
      sections.forEach((section, idx) => {
        const pal = palette[idx % palette.length]
        
        // Hide standard page numbers
        const pageNum = section.querySelector('.wx-page')
        if (pageNum) pageNum.setAttribute('style', 'display:none;')

        // Blobby 3D Shape
        const radii = [
          '40px 60px 45px 55px',
          '55px 45px 60px 40px',
          '45px 55px 40px 60px'
        ][idx % 3]

        section.setAttribute('style', `
          margin: 20px;
          padding: 40px 24px;
          background-color: ${pal.bg};
          border: 6px solid #ffffff;
          border-radius: ${radii};
          box-shadow: 0 10px 30px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.04);
          position: relative;
          box-sizing: border-box;
        `.trim().replace(/\n\s*/g, ' '))

        // 3. Inject "Character Sticker" (Dot eyes, rosy cheeks)
        const character = document.createElement('div')
        character.setAttribute('style', `
          position: absolute;
          top: -20px;
          right: 20px;
          width: 40px;
          height: 40px;
          background: #ffffff;
          border-radius: 50% 50% 45% 45%;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          border: 3px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        `.trim().replace(/\n\s*/g, ' '))
        
        character.innerHTML = `
          <div style="width:24px; height:18px; position:relative;">
            <div style="position:absolute; top:4px; left:4px; width:3px; height:3px; background:#444; border-radius:50%;"></div>
            <div style="position:absolute; top:4px; right:4px; width:3px; height:3px; background:#444; border-radius:50%;"></div>
            <div style="position:absolute; top:10px; left:2px; width:6px; height:3px; background:${pal.accent}; opacity:0.4; border-radius:50%;"></div>
            <div style="position:absolute; top:10px; right:2px; width:6px; height:3px; background:${pal.accent}; opacity:0.4; border-radius:50%;"></div>
          </div>
        `
        section.appendChild(character)

        // 4. Headers as "Art Stickers"
        const h2 = section.querySelector('.wx-h2')
        if (h2) {
          h2.setAttribute('style', `
            display: inline-block;
            background-color: #ffffff;
            color: ${pal.accent};
            padding: 8px 24px;
            font-size: 20px;
            font-family: ${SANS};
            font-weight: 800;
            border-radius: 99px;
            border: 4px solid #ffffff;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            margin-bottom: 24px;
            letter-spacing: 0.05em;
          `.trim().replace(/\n\s*/g, ' '))
        }

        // 5. Paragraphs
        section.querySelectorAll('.wx-p').forEach(p => {
          p.setAttribute('style', `
            font-family: ${SERIF};
            font-size: 16px;
            line-height: 1.8;
            color: #444;
            margin-bottom: 18px;
            text-align: justify;
          `.trim().replace(/\n\s*/g, ' '))
        })

        // 6. Sticker Elements (Callouts, Quotes)
        const stickerStyle = `
          margin: 30px 0;
          padding: 24px;
          border: 6px solid #ffffff;
          border-radius: 30px;
          background-color: ${pal.cardBg};
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
          position: relative;
          box-sizing: border-box;
        `.trim().replace(/\n\s*/g, ' ')

        section.querySelectorAll('.wx-callout, .wx-note, .wx-highlight, .wx-scheme-card').forEach(el => {
          el.setAttribute('style', stickerStyle)
          
          if (el.classList.contains('wx-callout')) {
            el.querySelectorAll('.wx-callout-item').forEach(item => {
              const itemStyle = item.classList.contains('lead') 
                ? `font-weight:900; color:${pal.accent}; font-size:16px; margin-bottom:8px;`
                : 'font-weight:500; color:#555; font-size:14px; margin-bottom:6px;'
              item.setAttribute('style', itemStyle)
            })
          }
        })

        // 7. Images as "Polaroid Cutouts"
        section.querySelectorAll('.wx-media-frame').forEach(frame => {
          frame.setAttribute('style', `
            border: 8px solid #ffffff;
            border-radius: 12px;
            background-color: #ffffff;
            box-shadow: 10px 10px 25px rgba(0,0,0,0.06);
            margin: 20px 0 10px;
            overflow: hidden;
          `.trim().replace(/\n\s*/g, ' '))
        })

        // 8. Strong Text
        section.querySelectorAll('.wx-strong').forEach(strong => {
          strong.setAttribute('style', `
            font-weight: 800;
            color: ${pal.accent};
            padding: 0 4px;
            background-color: rgba(255,255,255,0.6);
            border-radius: 4px;
          `.trim().replace(/\n\s*/g, ' '))
        })
      })

      return clone
    }
  }
}
