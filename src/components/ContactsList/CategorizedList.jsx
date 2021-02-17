import React, { useRef, useEffect, useState } from 'react'
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
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'));
  const categories = Object.entries(categorizedContacts);
  const categoryRefs = useRef({}).current;
  const addCategory = (header) => ref => { categoryRefs[header] = ref };

  function scrollToCategory(header) {
    const ref = categoryRefs[header];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' })
    }
  };

  return (
    <>
      <div className="categories">
        {categories.map(([header, _]) => (
          <Button
            onClick={_ => scrollToCategory(header)}
            label={header}
            theme="secondary"
            extension="narrow"
          />
        ))}
      </div>
      <Table>
        {categories.map(([header, contacts]) => (
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
