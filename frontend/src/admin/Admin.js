import React, { useState } from 'react'
import './Admin.css'
import ReportAdmin from './ReportAdmin.js'
import AccountAdmin from './AccountAdmin.js'
import EditLocationAdmin from './EditLocationAdmin.js'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

const Admin = () => {
    return (
        <ChakraProvider>
            <div>
                <Tabs>
                <TabList>
                    <Tab>Reported Listings View</Tab>
                    <Tab>Accounts View</Tab>
                    <Tab>Edit Locations Databse</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                    <ReportAdmin />
                    </TabPanel>
                    <TabPanel>
                    <AccountAdmin />
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