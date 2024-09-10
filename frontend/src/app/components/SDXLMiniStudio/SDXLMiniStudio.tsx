import config from '@app/config';
import * as React from 'react';
import axios from 'axios';
import Emitter from '../../utils/emitter';
import DocumentRenderer from '../DocumentRenderer/DocumentRenderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBucket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Page, PageSection, Text, TextContent, TextVariants, Flex, FlexItem, TextInput, Button, Card, Modal, Form, FormGroup, CardTitle, CardBody, TextArea, ActionGroup, FormSelect, FormSelectOption, Slider, SliderOnChangeEvent } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

interface SDXLMiniStudioProps { }

class GenerateParameters {
    prompt: string;
    guidance_scale: number;
    num_inference_steps: number;
    crops_coords_top_left: number[];
    width: number;
    height: number;
    denoising_limit: number;

    constructor(
        prompt: string = 'A beautiful landscape with a sunset',
        guidance_scale: number = 8.0,
        num_inference_steps: number = 40,
        crops_coords_top_left: number[] = [0, 0],
        width: number = 1024,
        height: number = 1024,
        denoising_limit: number = 0.8
    ) {
        this.prompt = prompt;
        this.guidance_scale = guidance_scale;
        this.num_inference_steps = num_inference_steps;
        this.crops_coords_top_left = crops_coords_top_left;
        this.width = width;
        this.height = height;
        this.denoising_limit = denoising_limit;
    }
}

const SDXLMiniStudio: React.FunctionComponent<SDXLMiniStudioProps> = () => {

    const [generateParameters, setGenerateParameters] = React.useState<GenerateParameters>(new GenerateParameters());
    const handleGenerateParametersChange = (value, field) => {
        setGenerateParameters(prevState => ({
            ...prevState,
            [field]: value,
        }));;
    }

    const sizeOptions = [
        { value: 'standard', label: 'Standard, 1:1, 1024 x 1024' },
        { value: 'vertical', label: 'Vertical, 4:7, 768 x 1344' },
        { value: 'portrait', label: 'Portrait, 9:9, 896 x 1152' },
        { value: 'photo', label: 'Photo, 9:7, 1152 x 896' },
        { value: 'landscape', label: 'Landscape, 19:13, 1216 x 832' },
        { value: 'widescreen', label: 'Widescreen, 7:4, 1344 x 768' },
        { value: 'cinematic', label: 'Cinematic, 12:5, 1536 x 640' },
    ];
    const [sizeOption, setSizeOption] = React.useState('standard');
    const handleSizeOptionChange = (_event: React.FormEvent<HTMLSelectElement>, value: string) => {
        switch (value) {
            case 'standard':
                handleGenerateParametersChange(1024, 'width');
                handleGenerateParametersChange(1024, 'height');
                break;
            case 'vertical':
                handleGenerateParametersChange(768, 'width');
                handleGenerateParametersChange(1344, 'height');
                break;
            case 'portrait':
                handleGenerateParametersChange(896, 'width');
                handleGenerateParametersChange(1152, 'height');
                break;
            case 'photo':
                handleGenerateParametersChange(1152, 'width');
                handleGenerateParametersChange(896, 'height');
                break;
            case 'landscape':
                handleGenerateParametersChange(1216, 'width');
                handleGenerateParametersChange(832, 'height');
                break;
            case 'widescreen':
                handleGenerateParametersChange(1344, 'width');
                handleGenerateParametersChange(768, 'height');
                break;
            case 'cinematic':
                handleGenerateParametersChange(1536, 'width');
                handleGenerateParametersChange(640, 'height');
                break;
        }
        setSizeOption(value);
    }

    const [guidance_scale, setGuidanceScale] = React.useState(8.0);
    const handleGuidanceScaleChange = (_event: SliderOnChangeEvent, value: number) => {
        setGuidanceScale(value);
        handleGenerateParametersChange(value, 'guidance_scale');
    }

    const [num_inference_steps, setNumInferenceSteps] = React.useState(40);
    const handleNumInferenceStepsChange = (_event: SliderOnChangeEvent, value: number) => {
        setNumInferenceSteps(value);
        handleGenerateParametersChange(value, 'num_inference_steps');
    }

    const [denoising_limit, setDenoisingLimit] = React.useState(80);
    const handleDenoisingLimitChange = (_event: SliderOnChangeEvent, value: number) => {
        setDenoisingLimit(value);
        handleGenerateParametersChange(value/100, 'denoising_limit');
    }

    const [fileData, setFileData] = React.useState('');
    const [fileName, setFileName] = React.useState('');

    const handleGenerateImage = (event) => {
        event.preventDefault();
        console.log('Generate image with prompt:', generateParameters.prompt);
        Emitter.emit('notification', { variant: 'success', title: '', description: 'Generation started! Please wait...' });
        axios.post(`${config.backend_api_url}/generate`, generateParameters, { responseType: 'arraybuffer' })
            .then((response) => {
                setFileName(response.headers['content-disposition'].split('filename=')[1].replace(/"/g, ''));
                const binary = new Uint8Array(response.data);
                const data = btoa(
                    binary.reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                setFileData(data);
                Emitter.emit('notification', { variant: 'success', title: '', description: 'Image generated!' });
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
                                    <FormGroup label="Prompt" fieldId="prompt">
                                        <TextArea
                                            id="prompt"
                                            name="prompt"
                                            aria-label="prompt"
                                            placeholder="Describe what you want to generate"
                                            onChange={(_event, value) => handleGenerateParametersChange(value, 'prompt')}
                                        />
                                    </FormGroup>
                                    <FormGroup label="Size" fieldId="size">
                                        <FormSelect
                                            value={sizeOption}
                                            id="size"
                                            name="size"
                                            aria-label="size"
                                            onChange={handleSizeOptionChange}
                                            >
                                            {sizeOptions.map((option, index) => (
                                                <FormSelectOption key={index} value={option.value} label={option.label} />
                                            ))}
                                            </FormSelect>
                                    </FormGroup>
                                    <FormGroup label="Guidance Scale" fieldId="guidance_scale">
                                        <Slider
                                            id="guidance_scale"
                                            value={guidance_scale}
                                            onChange={handleGuidanceScaleChange}
                                            aria-labelledby="Guidance Scale"
                                            hasTooltipOverThumb
                                            min={0}
                                            max={20}
                                            step={0.25}
                                        />
                                    </FormGroup>
                                    <FormGroup label="Number of Inference Steps" fieldId="num_inference_steps">
                                        <Slider
                                            id="num_inference_steps"
                                            value={num_inference_steps}
                                            onChange={handleNumInferenceStepsChange}
                                            aria-labelledby="Number of Inference Steps"
                                            hasTooltipOverThumb
                                            min={10}
                                            max={100}
                                            step={1}
                                        />
                                    </FormGroup>
                                    <FormGroup label="Denoising Limit (%)" fieldId="denoising_limit">
                                        <Slider
                                            id="denoising_limit"
                                            value={denoising_limit}
                                            onChange={handleDenoisingLimitChange}
                                            areCustomStepsContinuous
                                            aria-labelledby="Denoising Limit"
                                            hasTooltipOverThumb
                                            min={1}
                                            max={99}
                                            step={1}
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
                        <Card component="div">
                            <CardTitle>Generated Image</CardTitle>
                            <CardBody>
                                <DocumentRenderer fileData={fileData} fileName={fileName} />
                            </CardBody>
                        </Card>
                    </FlexItem>
                </Flex>
            </PageSection>
        </Page>

    )
};

export default SDXLMiniStudio;