React = require 'react'
{ browserHistory } = require 'react-router'

Meta = require 'components/meta'
ListView = require 'components/listview'
Button = require 'components/button'

content = "Please select repositories to setup test environements. You can add or remove repositories later from the settings page."
Step = require 'components/step'

styles = require './styles.styl'

SelectRepositories = (props) ->

  <div className={styles.selectrepositories}>
    <Step number=2 />
    <Meta title="Select Repositories for #{props.selectedOrganization}" description={content} />
    {
      unless props.repositories
        <ListView.Loading />
      else
        <div>
          <ListView>
            {
              props.repositories.map (repo) ->
                { organization, name, description, checked, status } = repo

                <ListView.Item key={name}>
                  <ListView.Content mainText={name} secText={status or 'Not setup'} />
                  <ListView.Action>
                    {
                      if status is 'Ready'
                        <Button title='Setup'
                          onClick={-> browserHistory.replace "/#{props.selectedOrganization}/#{name}/setup"}
                          bg='white' size='small' type='primary' />
                      else
                        <Button className={styles.button}
                          title='Activate'
                          bg='white' type='primary' size='small'
                          onClick={-> props.activateSelectedRepo repo} />
                    }
                  </ListView.Action>
                </ListView.Item>
            }
          </ListView>
        </div>
    }
    <Button className={styles.backbutton} title='Back to Organization List' onClick={-> props.push "/organizations"} bg='white' />
    <img src={'/assets/cloud.svg'} className={styles.bgimage} />
  </div>

module.exports = SelectRepositories
