import React, { useEffect } from 'react'
import './Admin.css'
import ReportAdmin from './ReportAdmin.js'
import AccountAdmin from './AccountAdmin.js'
import EditLocationAdmin from './EditLocationAdmin.js'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

const Admin = () => {
    useEffect(() => {
        if (sessionStorage.getItem('CurrentUser') === null) {
            window.location='/'
        }
    }, [])

    return (
        <ChakraProvider>
            <div id='adminPageWrapper'>
                <Tabs>
                <TabList>
                    <Tab _selected={{color: '#ffb703'}}>Reported Listings</Tab>
                    <Tab _selected={{color: '#ffb703'}}>Account Management</Tab>
                    <Tab _selected={{color: '#ffb703'}}>Base List Management</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <ReportAdmin />
                    </TabPanel>
                    <TabPanel>
                        <AccountAdmin/>
                    </TabPanel>
                    <TabPanel>
                        <EditLocationAdmin />
                    </TabPanel>
                </TabPanels>
                </Tabs>
            </div>
        </ChakraProvider>
    )
}

export default Admin