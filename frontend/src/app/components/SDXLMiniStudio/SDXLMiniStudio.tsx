import config from '@app/config';
import * as React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBucket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Page, PageSection, Text, TextContent, TextVariants, Flex, FlexItem, TextInput, Button, Card, Modal, Form, FormGroup } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

const SDXLMiniStudio: React.FunctionComponent = () => {

    return (
        <Page className='sdxl-ministudio'>
            <PageSection>
                <TextContent>
                    <Text component={TextVariants.h1}>SDXL Mini Studio</Text>
                </TextContent>
            </PageSection>
            <PageSection>
                <Flex>
                    <FlexItem>
                        Item 1
                    </FlexItem>
                    <FlexItem align={{ default: 'alignRight' }}>
                        Item 2
                    </FlexItem>
                </Flex>
            </PageSection>
        </Page>

    )
};

export default SDXLMiniStudio;