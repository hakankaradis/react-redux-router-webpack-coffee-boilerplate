React = require 'react'
styles = require './styles.styl'
LoadingIndicator = require('react-loading-indicator').default


ListView = ({ children }) ->

  <div className={styles.listview}>
    {children}
  </div>

ListViewLoading = ->

  <div className={styles.listviewloading}>
    <LoadingIndicator segmentWidth=5 segmentLength=10 spacing=10 />
  </div>

ListViewItem = ({ children }) ->

  <div className={styles.listviewitem}>
    {children}
  </div>

ListViewContent = ({ src, mainText, secText }) ->


  <div className={styles.listviewcontent}>
    {
      <img src={src} />  if src
    }
    <div className={styles.contentwrapper}>
      { <div className={styles.mainText}>{mainText}</div>  if mainText }
      { <div className={styles.secText}>{secText}</div>  if secText }
    </div>

  </div>

ListViewAction = ({ children }) ->

  <div className={styles.listviewaction}>
    {children}
  </div>



module.exports = ListView
module.exports.Item = ListViewItem
module.exports.Content = ListViewContent
module.exports.Action = ListViewAction
module.exports.Loading = ListViewLoading
