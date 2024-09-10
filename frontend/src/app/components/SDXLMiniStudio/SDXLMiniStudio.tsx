import config from '@app/config';
import * as React from 'react';
import axios from 'axios';
import Emitter from '../../utils/emitter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBucket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Page, PageSection, Text, TextContent, TextVariants, Flex, FlexItem, TextInput, Button, Card, Modal, Form, FormGroup, CardTitle, CardBody, TextArea, ActionGroup } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

interface SDXLMiniStudioProps { }

class GenerateParameters {
    prompt: string;

    constructor(prompt: string) {
        this.prompt = prompt ?? 'A beautiful landscape with a sunset';
    }
}

const SDXLMiniStudio: React.FunctionComponent<SDXLMiniStudioProps> = () => {

    const [prompt, setPrompt] = React.useState<string>('');
    const [generateParameters, setGenerateParameters] = React.useState<GenerateParameters>(new GenerateParameters(prompt));

    const handleGenerateParametersChange = (value, field) => {    
        setGenerateParameters(prevState => ({
            ...prevState,
            [field]: value,
        }));;
    }

    const handleGenerateImage = (event) => {
        event.preventDefault();
        console.log('Generate image with prompt:', generateParameters.prompt);
        axios.post(`${config.backend_api_url}/generate`, generateParameters)
            .then((response) => {
                Emitter.emit('notification', { variant: 'success', title: '', description: 'Generation started! Please wait...' });
            })
            .catch((error) => {
                Emitter.emit('notification', { variant: 'warning', title: '', description: 'Connection failed with the error: ' + error.response.data.message.Code });
            });
    }

    return (
        <Page className='sdxl-ministudio'>
            <PageSection>
                <TextContent>
                    <Text component={TextVariants.h1}>SDXL Mini Studio</Text>
                </TextContent>
            </PageSection>
            <PageSection>
                <Flex>
                    <FlexItem flex={{ default: 'flex_1' }}>
                        <Card component="div">
                            <CardTitle>Parameters</CardTitle>
                            <CardBody>
                                <Form onSubmit={handleGenerateImage}>
                                    <FormGroup label="Prompt" isRequired fieldId="prompt">
                                        <TextArea
                                            id="ta-prompt"
                                            name="ta-prompt"
                                            aria-label="prompt"
                                            placeholder="Describe what you want to generate"
                                            onChange={(_event, value) => handleGenerateParametersChange(value, 'prompt')}
                                        />
                                    </FormGroup>
                                    <ActionGroup>
                                        <Button type="submit" variant="primary">Generate the image</Button>
                                    </ActionGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </FlexItem>
                    <FlexItem flex={{ default: 'flex_3' }}>
                        Item 2
                    </FlexItem>
                </Flex>
            </PageSection>
        </Page>

    )
};

export default SDXLMiniStudio;