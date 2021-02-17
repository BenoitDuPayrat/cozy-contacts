import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Table } from 'cozy-ui/transpiled/react/Table'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import Button from 'cozy-ui/transpiled/react/Button'

import ContactsSubList from './ContactsSubList'
import { categorizeContacts } from '../../helpers/contactList'

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))

  //  Je déclare un dictionnaire pour stocker les références vers les composants des catégories.
  //  J'utilise un dictionnaire plutôt qu'un array de taille fixe car la liste de contacts peut changer
  //  (entrer une recherche puis la supprimer permet de créer cette situation)
  //  et il faut donc avoir une structure mutable, un dictionnaire étant plus flexible qu'un array.
  const categoryRefs = useRef({}).current
  //  Cette fonction permet d'assigner les composants directement dans le dictionnaire au render.
  const addCategory = header => ref => {
    categoryRefs[header] = ref
  }

  //  Cette fonction envoie vers le composant référencé par le header correspondant au bouton cliqué.
  function scrollToCategory(header) {
    const ref = categoryRefs[header]
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' })
    }
  }

  //  J'ai utilisé les boutons définis par cozy-ui.
  //  Je n'ai pas trouvé dans cozy-ui de composant de layout qui me satisfaisait pour le conteneur,
  //  Donc j'ai créé un simple conteneur avec un fichier de style.
  return (
    <>
      <div className="categories">
        {Object.entries(categorizedContacts).map(([header]) => (
          <Button
            key={`cat-finder-${header}`}
            onClick={() => scrollToCategory(header)}
            label={header}
            theme="secondary"
            extension="narrow"
          />
        ))}
      </div>
      <Table>
        {Object.entries(categorizedContacts).map(([header, contacts]) => (
          <List key={`cat-${header}`}>
            <ListSubheader key={header} ref={addCategory(header)}>
              {header}
            </ListSubheader>
            <ContactsSubList contacts={contacts} />
          </List>
        ))}
      </Table>
    </>
  )
}

CategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default CategorizedList
