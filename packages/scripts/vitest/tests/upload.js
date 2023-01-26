module.exports = {
  Upload: {
    abridgeName: { id: 2995 },
    accept: { PC: { attribute: { accept: 'image/*' }, attributeDom: 'input' }, id: 872 },
    action: {
      PC: {
        skip: true,
        event: [
          {
            props: { action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76' },
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  selectChange: [
                    '${fileList}',
                    {
                      currentSelectedFiles: [
                        {
                          lastModified: 1674355700444,
                          name: 'file-name.txt',
                          percent: 0,
                          raw: '${fileList[0]}',
                          size: 10,
                          type: 'image/png',
                          status: 'undefined',
                        },
                      ],
                    },
                  ],
                  change: [
                    {
                      '[0].lastModified': 1674355700444,
                      '[0].response': 'toBeTruthy',
                      '[0].name': 'file-name.txt',
                      '[0].percent': 100,
                      '[0].status': 'success',
                      '[0].raw': '${fileList[0]}',
                      '[0].uploadTime': 'toBeTruthy',
                    },
                    {
                      trigger: 'add',
                      'file.raw': '${fileList[0]}',
                      'file.url':
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                      'file.name': 'file-name.txt',
                      'file.uploadTime': 'toBeTruthy',
                      'file.response': 'toBeTruthy',
                    },
                  ],
                },
                delay: 3000,
              },
            ],
          },
        ],
      },
      id: 873,
    },
    allowUploadDuplicateFile: {
      PC: {
        event: [
          {
            props: {
              files: [
                {
                  name: 'file-name.txt',
                  url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
                },
              ],
              action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
              allowUploadDuplicateFile: false,
            },
            description: 'allowUploadDuplicateFile is equal to false',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  validate: [{ type: 'FILTER_FILE_SAME_NAME', 'files[0].raw': '${fileList[0]}' }],
                },
                delay: true,
              },
            ],
          },
          {
            props: {
              files: [
                {
                  name: 'file-name.txt',
                  url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
                },
              ],
              action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
              allowUploadDuplicateFile: true,
            },
            description: 'allowUploadDuplicateFile is equal to true',
            expect: [
              { trigger: "simulateFileChange('input')", event: { validate: 'not' }, delay: true },
            ],
          },
        ],
      },
      id: 2454,
    },
    autoUpload: {
      PC: {
        event: [
          {
            props: { autoUpload: false, action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json' },
            description: 'autoUpload is equal false',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  change: [
                    {
                      '[0].response': 'undefined',
                      '[0].raw': '${fileList[0]}',
                      '[0].name': 'file-name.txt',
                      '[0].status': 'waiting',
                      '[0].percent': 0,
                    },
                  ],
                },
                delay: true,
              },
            ],
          },
        ],
      },
      id: 885,
    },
    beforeAllFilesUpload: {
      PC: {
        event: [
          {
            props: {
              autoUpload: false,
              beforeAllFilesUpload: '() => false',
              action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
            },
            description: 'beforeAllFilesUpload can stop uploading',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input', 'file', 3)",
                event: {
                  change: 'not',
                  validate: [
                    { type: 'BEFORE_ALL_FILES_UPLOAD', 'files.map(t => t.raw)': '${fileList}' },
                  ],
                },
                delay: true,
              },
            ],
          },
        ],
      },
      id: 2928,
    },
    beforeUpload: {
      PC: {
        event: [
          {
            props: {
              autoUpload: false,
              beforeUpload: '() => false',
              action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
            },
            description:
              'beforeUpload can skip all files to upload, just like beforeAllFilesUpload',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input', 'file', 3)",
                event: {
                  change: 'not',
                  validate: [
                    { type: 'CUSTOM_BEFORE_UPLOAD', 'files.map(t => t.raw)': '${fileList}' },
                  ],
                },
                delay: true,
              },
            ],
          },
          {
            props: {
              autoUpload: false,
              beforeUpload: "(file) => file.name === 'file-name1.txt'",
              action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
            },
            description: 'beforeUpload can skip some of files to upload',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input', 'file', 3)",
                event: {
                  change: [{ '[0].raw': '${fileList[1]}' }],
                  validate: [
                    {
                      type: 'CUSTOM_BEFORE_UPLOAD',
                      'files.map(t => t.raw)': '${[fileList[0], fileList[2]]}',
                    },
                  ],
                },
                delay: true,
              },
            ],
          },
        ],
      },
      id: 876,
    },
    children: {
      PC: {
        props: { theme: 'file', action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json' },
        tnode: true,
      },
      id: 1169,
    },
    data: {
      PC: {
        event: [
          {
            props: {
              data: { file_name: 'custom-file-name.excel' },
              action: 'https://cdc.cdn-go.cn/tdc/latest/mock-fail.json',
            },
            description: 'upload request can send extra data',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  fail: [
                    {
                      'XMLHttpRequest.upload.requestParams': {
                        file_name: 'custom-file-name.excel',
                        file: '${fileList[0]}',
                        length: 1,
                      },
                    },
                  ],
                },
                delay: 700,
              },
            ],
          },
        ],
      },
      id: 877,
    },
    disabled: {
      PC: {
        event: [
          {
            props: { disabled: true },
            description: 'disabled upload can not trigger onSelectChange',
            expect: [{ trigger: "simulateFileChange('input')", event: { selectChange: 'not' } }],
          },
        ],
      },
      id: 879,
    },
    dragContent: {
      PC: {
        props: {
          theme: 'custom',
          draggable: 'true',
          action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
        },
        tnode: true,
      },
      id: 2991,
    },
    draggable: { id: 886 },
    fileListDisplay: {
      PC: {
        tnode: [
          {
            description: 'props.fileListDisplay works fine if theme=file',
            variables: ["const fileList = getFakeFileList('file', 3);"],
            props: {
              files: '${fileList}',
              theme: 'file',
              action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
            },
            dom: [],
            trigger: '',
            params: [{ files: '${fileList}' }],
          },
          {
            description:
              'props.fileListDisplay works fine if theme=image-flow && multiple=true && draggable=true',
            variables: [
              "const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];",
            ],
            props: {
              files: '${fileList}',
              theme: 'image-flow',
              multiple: true,
              draggable: true,
              action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
            },
            dom: [],
            trigger: '',
            params: [{ files: '${fileList}' }],
          },
          {
            description:
              'props.fileListDisplay works fine if theme=file-flow && multiple=true && draggable=true',
            variables: [
              "const fileList = [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }];",
            ],
            props: {
              files: '${fileList}',
              theme: 'file-flow',
              multiple: true,
              draggable: true,
              action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
            },
            dom: [],
            trigger: '',
            params: [{ files: '${fileList}' }],
          },
        ],
      },
      id: 2383,
    },
    files: { id: 887 },
    format: {
      PC: {
        event: [
          {
            props: {
              format:
                "(fileRaw) => ({ field_custom: 'a new file field', name: 'another name', raw: fileRaw })",
              action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
            },
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  selectChange: [
                    '${fileList}',
                    {
                      'currentSelectedFiles[0].name': 'another name',
                      'currentSelectedFiles[0].field_custom': 'a new file field',
                      'currentSelectedFiles[0].raw': '${fileList[0]}',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      id: 884,
    },
    formatRequest: {
      PC: {
        event: [
          {
            props: {
              formatRequest: "(requestData) => ({ requestData, more_field: 'more custom field' })",
              action: 'https://cdc.cdn-go.cn/tdc/latest/mock-fail.json',
            },
            description: 'upload request data can be changed through formatRequest',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  fail: [
                    {
                      'XMLHttpRequest.upload.requestParams.requestData': {
                        file: '${fileList[0]}',
                        length: 1,
                      },
                      'XMLHttpRequest.upload.requestParams.more_field': 'more custom field',
                    },
                  ],
                },
                delay: 700,
              },
            ],
          },
        ],
      },
      id: 2946,
    },
    formatResponse: {
      PC: {
        event: [
          {
            props: {
              formatResponse:
                "(response) => ({ responseData: response, extra_field: 'extra value' })",
              action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            },
            expect: [
              {
                trigger: "simulateFileChange('input')",
                delay: 3000,
                event: {
                  change: [
                    {
                      '[0].response.responseData.url': 'toBeTruthy',
                      '[0].response.extra_field': 'extra value',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      id: 1220,
    },
    headers: {
      PC: {
        event: [
          {
            props: {
              headers: { 'XML-HTTP-REQUEST': 'tdesign_token' },
              action: 'https://cdc.cdn-go.cn/tdc/latest/mock-fail.json',
            },
            description: '',
            expect: [
              {
                trigger: "simulateFileChange('input')",
                event: {
                  fail: [
                    { "XMLHttpRequest.upload.requestHeaders['XML-HTTP-REQUEST']": 'tdesign_token' },
                  ],
                },
                delay: 700,
              },
            ],
          },
        ],
      },
      id: 878,
    },
    isBatchUpload: {
      PC: {
        event: [
          {
            props: {
              isBatchUpload: true,
              autoUpload: false,
              action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
              files: "${[{ url: 'https://file.txt', name: 'file.txt' }]}",
            },
            expect: [
              {
                trigger: "simulateFileChange('input', 'file', 3)",
                delay: 300,
                event: { change: ['length=3'] },
              },
            ],
          },
        ],
      },
      id: 2363,
    },
    locale: {
      PC: {
        props: {
          theme: 'file-flow',
          files: [{ url: 'https://tdesign.gtimg.com/demo/demo-image-1.png', status: 'progress' }],
          action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json',
        },
        dom: {
          "{progress: { uploadingText: 'uploading' }}": {
            '.t-upload__file-flow-progress': { text: 'uploading 0%' },
          },
        },
      },
      id: 2733,
    },
    max: { id: 1191 },
    method: { id: 874 },
    mockProgressDuration: { id: 3253 },
    multiple: { PC: { attribute: { multiple: true }, attributeDom: 'input' }, id: 880 },
    name: { id: 881 },
    placeholder: {
      PC: { dom: { 'this is placeholder': { '.t-upload__placeholder': 1 } } },
      id: 1167,
    },
    requestMethod: { id: 1789 },
    showUploadProgress: { id: 1790 },
    sizeLimit: { id: 1564 },
    status: {
      PC: {
        props: { tips: 'upload tips text', action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json' },
        dom: [
          '.t-upload__tips-default',
          '.t-upload__tips-success',
          '.t-upload__tips-warning',
          '.t-upload__tips-error',
        ],
      },
      id: 2994,
    },
    theme: { id: 1182 },
    tips: {
      PC: {
        props: { action: 'https://cdc.cdn-go.cn/tdc/latest/menu.json' },
        tnode: { dom: ['.t-upload__tips'], trigger: '' },
      },
      id: 1183,
    },
    trigger: { PC: { props: { theme: 'file' }, tnode: true }, id: 889 },
    triggerButtonProps: { id: 2985 },
    uploadAllFilesInOneRequest: { id: 2362 },
    useMockProgress: { id: 1987 },
    withCredentials: {
      PC: {
        event: [
          {
            props: {
              withCredentials: true,
              action: 'https://cdc.cdn-go.cn/tdc/latest/mock-fail.json',
            },
            description: '',
            expect: [
              {
                trigger: "simulateFileChange('input')",
                event: { fail: [{ 'XMLHttpRequest.withCredentials': true }] },
                delay: 700,
              },
            ],
          },
        ],
      },
      id: 882,
    },
    cancelUpload: { id: 1791 },
    change: { id: 888 },
    dragenter: { id: 1184 },
    dragleave: { id: 1185 },
    drop: { id: 2628 },
    fail: {
      PC: {
        event: [
          {
            props: { action: 'https://cdc.cdn-go.cn/tdc/latest/mock-fail.json' },
            description: '',
            expect: [
              {
                trigger: "const fileList = simulateFileChange('input')",
                event: {
                  fail: [
                    {
                      'XMLHttpRequest.upload.requestParams': { file: '${fileList[0]}', length: 1 },
                    },
                  ],
                },
                delay: 700,
              },
            ],
          },
        ],
      },
      id: 892,
    },
    oneFileFail: { id: 2984 },
    oneFileSuccess: { id: 2945 },
    preview: { id: 893 },
    progress: { id: 890 },
    remove: { id: 1170 },
    selectChange: { id: 2337 },
    success: { id: 891 },
    validate: { id: 2929 },
    waitingUploadFilesChange: { id: 2947 },
    triggerUpload: { id: 2989 },
    uploadFiles: { id: 2990 },
    '<T extends UploadFile = UploadFile>': { id: 2996 },
  },
  UploadFile: {
    lastModified: { id: 1177 },
    name: { id: 1179 },
    percent: { id: 1181 },
    raw: { id: 982 },
    response: { id: 1186 },
    size: { id: 1178 },
    status: { id: 979 },
    type: { id: 1180 },
    uploadTime: { id: 2993 },
    url: { id: 981 },
    PlainObject: { id: 3308 },
  },
};
