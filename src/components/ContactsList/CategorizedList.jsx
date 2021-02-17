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
  const categoryRefs = useRef(Array.from({ length: categories.length }, () => React.createRef()));

  useEffect(() => {
    categoryRefs.current[categoryRefs.current.length - 1].current.focus()
  }, [length]);

  function scrollToCategory(index) {
    const ref = categoryRefs.current[index].current;
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' })
    }
  };

  return (
    <>
      <div className="categories">
        {categories.map(([header, _], i) => (
          <Button
            onClick={_ => scrollToCategory(i)}
            label={header}
            theme="secondary"
            extension="narrow"
          />
        ))}
      </div>
      <Table>
        {categories.map(([header, contacts], i) => (
          <List key={`cat-${header}`}>
            <ListSubheader key={header} ref={categoryRefs.current[i]}>
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
