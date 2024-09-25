import type { Meta, StoryObj } from '@storybook/angular';
import { EasygridComponent } from './easygrid.component';
import { moduleMetadata } from '@storybook/angular';
import { EasyGridModule } from '../shared/easy-grid/src/public-api';
import { ColGroupDef } from 'ag-grid-community';

const meta: Meta<EasygridComponent> = {
  title: 'Components/Easygrid',
  component: EasygridComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [EasyGridModule],
      declarations: [EasygridComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Easygrid component with static data and custom column definitions.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};


export const Playground: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name' ,  filter: 'agTextColumnFilter', lockPosition:false , sortable: true , resizable: true, rowDrag: true, checkboxSelection: true, editable: true, pinned: 'left' },
      { field: 'assessmentType', headerName: 'Assessment Type',  cellEditor: 'agSelectCellEditor', cellEditorParams: {values: ['Quiz', 'Homework', 'Test', 'Project'], }, filter: 'agTextColumnFilter', cellStyle: { backgroundColor: '#71797E' }, lockPosition: false , sortable: true , resizable: true, rowDrag: true , editable: true, pinned: 'left' },
      { headerName: 'Active', field: 'isActive', filter: 'selectFilter', cellRenderer: 'booleanCellRenderer' , lockPosition:false , sortable: true , resizable: true, rowDrag: true, editable: true, pinned: 'right' },
      { 
        headerName: 'Submission Date (Formatted)', 
        field: 'submissionDate', 
        filter: 'agDateColumnFilter', 
        editable: true,
        cellEditor: 'agDateCellEditor', 
        valueFormatter: (params) => {
          const date = new Date(params.value);
          return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        },
        pinned: 'left' 
      },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true, submissionDate: '01/01/2022' },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false, submissionDate: '02/01/2022' },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true, submissionDate: '03/01/2022' },
      { assessmentName: 'Geography Assignment', assessmentType: 'Homework', isActive: true, submissionDate: '04/01/2022' },
      { assessmentName: 'English Essay', assessmentType: 'Assignment', isActive: false, submissionDate: '05/01/2022' },
      { assessmentName: 'Physics Lab', assessmentType: 'Experiment', isActive: true, submissionDate: '06/01/2022' },
      { assessmentName: 'Biology Quiz', assessmentType: 'Quiz', isActive: false, submissionDate: '07/01/2022' },
      { assessmentName: 'Chemistry Homework', assessmentType: 'Homework', isActive: true, submissionDate: '08/01/2022' },
      { assessmentName: 'Computer Science Project', assessmentType: 'Project', isActive: false, submissionDate: '09/01/2022' },
      { assessmentName: 'Art Assignment', assessmentType: 'Assignment', isActive: true, submissionDate: '10/01/2022' },
      { assessmentName: 'Music Test', assessmentType: 'Test', isActive: false, submissionDate: '11/01/2022' },
      { assessmentName: 'Drama Rehearsal', assessmentType: 'Performance', isActive: true, submissionDate: '12/01/2022' },
      { assessmentName: 'Economics Project', assessmentType: 'Project', isActive: false, submissionDate: '01/15/2022' },
      { assessmentName: 'Philosophy Essay', assessmentType: 'Essay', isActive: true, submissionDate: '02/15/2022' },
      { assessmentName: 'Sociology Quiz', assessmentType: 'Quiz', isActive: false, submissionDate: '03/15/2022' },
      { assessmentName: 'Geography Test', assessmentType: 'Test', isActive: true, submissionDate: '04/15/2022' },
      { assessmentName: 'Psychology Assignment', assessmentType: 'Assignment', isActive: false, submissionDate: '05/15/2022' },
      { assessmentName: 'Statistics Homework', assessmentType: 'Homework', isActive: true, submissionDate: '06/15/2022' },
      { assessmentName: 'Engineering Lab', assessmentType: 'Experiment', isActive: true, submissionDate: '07/15/2022' },
      { assessmentName: 'Astronomy Project', assessmentType: 'Project', isActive: false, submissionDate: '08/15/2022' },
      { assessmentName: 'Environmental Science Test', assessmentType: 'Test', isActive: true, submissionDate: '09/15/2022' },
    ],
    options: {
      rowSelection: 'multiple',
      rowDragManaged: true,
      animateRows: true,
      onRowDragEnd: (event) => {
        console.log('Row drag ended:', event.node.data);
        },
    },
    pagination: true,
  },
  argTypes: {
    pagination: { control: 'boolean' },  
  },
  render: (args) => ({
    props: args,
    template: `
    <app-easy-grid
      [columnDefs]="columnDefs"
      [rowData]="dataSource"
      [pagination]="pagination" 
      autoSizeColumnsToFit="size"
       [gridOptions]="options" 
       >
    </app-easy-grid>
`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component`. User cna change the controls to see different options',
      },
      source: {
        code: `
        
        `,
        language: 'html',
      },
    },
  },
};


export default meta;

type Story = StoryObj<EasygridComponent>;

export const Basic: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', lockPosition:true , sortable: false, resizable: false},
      { field: 'assessmentType', headerName: 'Assessment Type', lockPosition:true , sortable: false, resizable: false},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition:true , sortable: false, resizable: false},
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with a predefined set of static data and column definitions.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },     
    },
  },
};

export const ActionButtons: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', lockPosition: true, sortable: false, resizable: false },
      { field: 'assessmentType', headerName: 'Assessment Type', lockPosition: true, sortable: false, resizable: false },
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition: true, sortable: false, resizable: false },
      {
        headerName: 'Actions',
        cellRenderer: (params: any) => {
          const removeButton = `<button class="btn btn-danger btn-sm" style="margin-right: 5px;">Remove</button>`;
          const downloadButton = `<button class="btn btn-primary btn-sm">Download</button>`;
          return `${removeButton}${downloadButton}`;
        },
        width: 150,
      }
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with an Action column. The Action column contains buttons for each row (Remove and Download). Clicking on these buttons triggers respective actions.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};


export const Pagination: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name' , lockPosition:true , sortable: false , resizable: false},
      { field: 'assessmentType', headerName: 'Assessment Type', lockPosition:true  , sortable: false , resizable: false},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer' , lockPosition:true , sortable: false , resizable: false},
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Assignment', assessmentType: 'Homework', isActive: true },
      { assessmentName: 'English Essay', assessmentType: 'Assignment', isActive: false },
      { assessmentName: 'Physics Lab', assessmentType: 'Experiment', isActive: true },
      { assessmentName: 'Biology Quiz', assessmentType: 'Quiz', isActive: false },
      { assessmentName: 'Chemistry Homework', assessmentType: 'Homework', isActive: true },
      { assessmentName: 'Computer Science Project', assessmentType: 'Project', isActive: false },
      { assessmentName: 'Art Assignment', assessmentType: 'Assignment', isActive: true },
      { assessmentName: 'Music Test', assessmentType: 'Test', isActive: false },
      { assessmentName: 'Drama Rehearsal', assessmentType: 'Performance', isActive: true },
      { assessmentName: 'Economics Project', assessmentType: 'Project', isActive: false },
      { assessmentName: 'Philosophy Essay', assessmentType: 'Essay', isActive: true },
      { assessmentName: 'Sociology Quiz', assessmentType: 'Quiz', isActive: false },
      { assessmentName: 'Geography Test', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Psychology Assignment', assessmentType: 'Assignment', isActive: false },
      { assessmentName: 'Statistics Homework', assessmentType: 'Homework', isActive: true },
      { assessmentName: 'Engineering Lab', assessmentType: 'Experiment', isActive: true },
      { assessmentName: 'Astronomy Project', assessmentType: 'Project', isActive: false },
      { assessmentName: 'Environmental Science Test', assessmentType: 'Test', isActive: true },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
    <app-easy-grid
      [columnDefs]="columnDefs"
      [rowData]="dataSource"
      [pagination]="true" 
      autoSizeColumnsToFit="size">
    </app-easy-grid>
`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with pagination enabled. Users can change the number of items displayed per page and change the page number to view data on different pages.',
      },
      source: {
        code: `
          <app-easy-grid 
            [columnDefs]="columnDefs" 
            [rowData]="dataSource" 
            [pagination]="true" 
            autoSizeColumnsToFit="size">
          </app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const Filter: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', filter: 'agTextColumnFilter', lockPosition:true , sortable: false , resizable: false},
      { field: 'assessmentType', headerName: 'Assessment Type', filter: 'agTextColumnFilter' , lockPosition:true , sortable: false , resizable: false},
      { headerName: 'Active', field: 'isActive', filter: 'selectFilter', cellRenderer: 'booleanCellRenderer', lockPosition:true , sortable: false , resizable: false} ,
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with filter options enabled. Users can filter data using different options to view specific subsets of data.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};
export const ColumnMoving: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name' , sortable: false , resizable: false },
      { field: 'assessmentType', headerName: 'Assessment Type' , sortable: false  , resizable: false},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer' , sortable: false , resizable: false},
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with column moving enabled. Users can dynamically rearrange the order of columns by dragging and dropping headers to customize their view of the data.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};
export const ColumnResizing: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', width: 200 , lockPosition:true , sortable: false },
      { field: 'assessmentType', headerName: 'Assessment Type',  width: 200 , lockPosition:true , sortable: false},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', width: 150, lockPosition:true , sortable: false},
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with column resizing enabled. Users can adjust the width of columns by dragging the edges of the column headers to fit their data or personal preferences.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const ColumnType: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', sortable: false, lockPosition:true, resizable: false },
      { 
        field: 'assessmentType', 
        headerName: 'Assessment Type', 
        cellStyle: { backgroundColor: '#71797E' },
        sortable: false, 
        resizable: false,
        lockPosition:true 
      },
      { 
        headerName: 'Active', 
        field: 'isActive', 
        cellRenderer: 'booleanCellRenderer', 
        sortable: false, 
        resizable: false,
        lockPosition:true 
      }
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with the Assessment Type column shaded. The background color of the Assessment Type column is set for visual distinction.',
      },
      source: {
        code: `
          <app-easy-grid 
            [columnDefs]="columnDefs" 
            [rowData]="dataSource" 
            autoSizeColumnsToFit="size">
          </app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const ColumnPinning: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', pinned: 'left'},
      { field: 'assessmentType', headerName: 'Assessment Type', pinned: 'left'},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', pinned: 'right'},
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with column pinning functionality. The "Assessment Name" and "Assessment Type" columns are pinned to the left, ensuring they remain visible while users scroll through the grid. The "Active" column is pinned to the right, providing quick access to the status of each assessment. This layout enhances the usability of the grid by allowing users to maintain context on key information as they navigate through the data.'
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const ColumnGroups: Story = {
  args: {
    columnDefs: [
      {
        headerName: 'Assessment Information',
        children: [
          { field: 'assessmentName', headerName: 'Assessment Name', lockPosition: true, sortable: false, resizable: false },
          { field: 'assessmentType', headerName: 'Assessment Type', lockPosition: true, sortable: false, resizable: false },
        ],
      } as ColGroupDef,
      {
        headerName: 'Status',
        children: [
          { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition: true, sortable: false, resizable: false },
        ],
      } as ColGroupDef,
    ],
    dataSource: [
      {
        assessmentName: 'Math Test',
        assessmentType: 'Quiz',
        isActive: true,
        children: [
          { assessmentName: 'Algebra', assessmentType: 'Quiz', isActive: true },
          { assessmentName: 'Geometry', assessmentType: 'Quiz', isActive: true },
        ],
      },
      {
        assessmentName: 'Science Project',
        assessmentType: 'Homework',
        isActive: false,
        children: [
          { assessmentName: 'Biology', assessmentType: 'Project', isActive: false },
          { assessmentName: 'Chemistry', assessmentType: 'Project', isActive: false },
        ],
      },
      {
        assessmentName: 'History Exam',
        assessmentType: 'Test',
        isActive: true,
        children: [
          { assessmentName: 'World History', assessmentType: 'Test', isActive: true },
          { assessmentName: 'US History', assessmentType: 'Test', isActive: true },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with column groups. Each main assessment can have sub-assessments, allowing for a more organized view of the data.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const ColumnGroupPinning: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', pinned: 'left', lockPinned:true },
      { 
        field: 'assessmentType', 
        headerName: 'Assessment Type', 
        pinned: 'left',
        lockPinned:true 
      },
      { 
        headerName: 'Active', 
        field: 'isActive', 
        cellRenderer: 'booleanCellRenderer', 
        pinned: 'right',
        lockPinned:true  
      }
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with column pinning functionality, where all columns are locked in their pinned positions. The "Assessment Name" and "Assessment Type" columns are pinned to the left, ensuring they remain visible while users scroll through the data. The "Active" column is pinned to the right for easy access to status information. This configuration enhances usability by keeping essential data in view, facilitating better navigation and interaction with the grid.'
      },
      source: {
        code: `
          <app-easy-grid 
            [columnDefs]="columnDefs" 
            [rowData]="dataSource" 
            autoSizeColumnsToFit="size">
          </app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const ColumnSpanning: Story = {
  args: {
    columnDefs: [
      { 
        field: 'country', 
        headerName: 'Country', 
        sortable: true, 
        lockPosition: true 
      },
      { 
        field: 'age', 
        headerName: 'Age', 
        colSpan: (params) => {
          const country = params.data.country;
          if (country === "Russia") {
            return 2; // Russia spans 2 columns
          } else if (country === "United States") {
            return 4; // United States spans 4 columns
          } else {
            return 1; // Other countries occupy 1 column
          }
        },
        lockPosition: true 
      },
      { 
        field: 'city', 
        headerName: 'City', 
        lockPosition: true 
      },
      { 
        field: 'population', 
        headerName: 'Population', 
        lockPosition: true 
      }
    ],
    dataSource: [
      { country: 'Russia', age: 35, city: 'Moscow', population: 11920000 },
      { country: 'United States', age: 30, city: 'New York', population: 8419000 },
      { country: 'Germany', age: 28, city: 'Berlin', population: 3769000 },
      { country: 'France', age: 22, city: 'Paris', population: 2148000 },
      { country: 'United States', age: 40, city: 'Los Angeles', population: 3971000 },
      { country: 'Russia', age: 50, city: 'Saint Petersburg', population: 5384000 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with column spanning functionality. The "Age" column dynamically spans multiple columns based on the country of the corresponding row. For rows where the country is "Russia," the "Age" column spans 2 columns, while for "United States," it spans 4 columns. For all other countries, it occupies a single column. This feature enhances the visual representation of data by grouping related information together, improving readability and organization within the grid.'
      },
      source: {
        code: `
          <app-easy-grid 
            [columnDefs]="columnDefs" 
            [rowData]="dataSource" 
            autoSizeColumnsToFit="size">
          </app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const RowSorting: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', sortable: true , lockPosition:true , resizable: false},
      { field: 'assessmentType', headerName: 'Assessment Type', sortable: true , lockPosition:true , resizable: false},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', sortable: true,lockPosition:true , resizable: false },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with row sorting enabled. Users can click on the row headers to sort the data in ascending or descending order based on the selected row.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

const rowSpan = (params: any) => {
  const equivalenceCourses = params.data.equivalenceCourses;
  return equivalenceCourses && equivalenceCourses.length > 1 ? equivalenceCourses.length : 1;
};

export const RowSpanning: Story = {
  args: {
    columnDefs: [
      { field: 'courseCode', headerName: 'Course Code', sortable: true, resizable: true },
      {
        field: 'equivalenceCourses',
        headerName: 'Equivalence Courses',
        rowSpan: rowSpan, 
        cellRenderer: (params: any) => {
          const courses = params.data.equivalenceCourses;
          return courses ? courses.join(', ') : '';
        },
        autoHeight: true, 
      },
    ],
    dataSource: [
      { courseCode: 'MATH101', equivalenceCourses: ['MATH102', 'MATH103'] },
      { courseCode: 'PHYS101', equivalenceCourses: ['PHYS102'] },
      { courseCode: 'CHEM101', equivalenceCourses: ['CHEM102', 'CHEM103', 'CHEM104'] },
    ],
    options: {
      suppressRowTransform: true, 
      domLayout: 'autoHeight',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with a rowSpan feature. Rows that contain multiple equivalence courses will span the appropriate number of rows.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const RowSelection: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', lockPosition: true, sortable: false, resizable: false,  checkboxSelection: true, },
      { field: 'assessmentType', headerName: 'Assessment Type', lockPosition: true, sortable: false, resizable: false },
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition: true, sortable: false, resizable: false },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
    ],
    options: {
      rowSelection: 'multiple',
      onRowSelected: (event) => {
        console.log('Row selected:', event.node.data);
      }
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with row selection enabled. Users can select both single and multiple rows, and selected row data will be logged to the console.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" [gridOptions]="options" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const RowHeight: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', lockPosition: true, sortable: false, resizable: false },
      { field: 'assessmentType', headerName: 'Assessment Type', lockPosition: true, sortable: false, resizable: false },
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition: true, sortable: false, resizable: false },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Assignment', assessmentType: 'Project', isActive: false },
      { assessmentName: 'Physics Lab', assessmentType: 'Experiment', isActive: true },
    ],
    options: {
      getRowHeight: (params) => {
        return params.data.isActive ? 50 : 70; 
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <app-easy-grid
      [columnDefs]="columnDefs"
      [rowData]="dataSource"
      [pagination]="false" 
      [gridOptions]="options"
      autoSizeColumnsToFit="size">
    </app-easy-grid>
`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with rows of varying heights based on data properties.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" [gridOptions]="options" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};


export const AccessingRowsByRowID: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', lockPosition: true, sortable: false, resizable: false },
      { field: 'assessmentType', headerName: 'Assessment Type', lockPosition: true, sortable: false, resizable: false },
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition: true, sortable: false, resizable: false },
    ],
    dataSource: [
      { id: 1, assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { id: 2, assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { id: 3, assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { id: 4, assessmentName: 'Geography Assignment', assessmentType: 'Project', isActive: false },
      { id: 5, assessmentName: 'Physics Lab', assessmentType: 'Experiment', isActive: true },
    ],
    options: {
      getRowId: (params) => {
        return params.data.id; 
      },
      onRowSelected: (event) => {
        const selectedRowData = event.node.data;
        console.log('Selected Row Data:', selectedRowData);
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how to access row data by row ID in the `Easygrid Component`. Selecting a row logs its data to the console.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" [gridOptions]="options" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const RowDragging: Story = {
  args: {
    columnDefs: [
      { 
        field: 'assessmentName', 
        headerName: 'Assessment Name', 
        lockPosition: true, 
        sortable: false, 
        resizable: false,
        rowDrag: true,
      },
      { 
        field: 'assessmentType', 
        headerName: 'Assessment Type', 
        lockPosition: true, 
        sortable: false, 
        resizable: false,
      },
      { 
        headerName: 'Active', 
        field: 'isActive', 
        cellRenderer: 'booleanCellRenderer', 
        lockPosition: true, 
        sortable: false, 
        resizable: false,
      },
    ],
    dataSource: [
      { id: 1, assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { id: 2, assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { id: 3, assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { id: 4, assessmentName: 'Geography Assignment', assessmentType: 'Project', isActive: false },
      { id: 5, assessmentName: 'Physics Lab', assessmentType: 'Experiment', isActive: true },
    ],
    options: {
      rowDragManaged: true,
      animateRows: true,
      onRowDragEnd: (event) => {
        console.log('Row drag ended:', event.node.data);
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the row dragging functionality in the `Easygrid Component`. Users can drag rows to reorder them.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" [gridOptions]="options" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const FullWidthRow: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', lockPosition: true, sortable: false, resizable: false },
      { field: 'assessmentType', headerName: 'Assessment Type', lockPosition: true, sortable: false, resizable: false },
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition: true, sortable: false, resizable: false },
      {
        headerName: 'Details',
        cellRenderer: (params: any) => {
          return `<div style="width: 100%; background-color: #aaaaaa; ">Full Width Row Content: ${params.data.assessmentName}</div>`;
        },
        width: 300,
      }
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with a full-width row effect. The Details column contains content that spans the full width of the grid, providing additional context for each assessment.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const AggregateFunctions: Story = {
  args: {
    columnDefs: [
      { field: 'studentName', headerName: 'Student Name', lockPosition: true },
      { field: 'scores', headerName: 'Scores', valueGetter: (params) => params.data.scores.join(', ') },
      { headerName: 'Sum', valueGetter: (params) => params.data.scores.reduce((a: any, b: any) => a + b, 0), aggFunc: 'sum' },
      { headerName: 'Max', valueGetter: (params) => Math.max(...params.data.scores), aggFunc: 'max' },
      { headerName: 'Min', valueGetter: (params) => Math.min(...params.data.scores), aggFunc: 'min' },
      { headerName: 'Avg', valueGetter: (params) => params.data.scores.reduce((a: any, b: any) => a + b, 0) / params.data.scores.length, aggFunc: 'avg' },
    ],
    dataSource: [
      { studentName: 'Alice Johnson', scores: [87.34, 90.12, 85.00, 88.75, 91.50]},
      { studentName: 'Bob Smith', scores: [92.56, 85.00, 78.90, 80.00, 82.34] },
      { studentName: 'Charlie Brown', scores: [78.23, 81.50, 76.00, 79.25, 80.00]},
      { studentName: 'Diana Prince', scores: [90.45, 92.10, 88.88, 91.00, 93.50]},
      { studentName: 'Edward Elric', scores: [85.75, 87.00, 89.45, 82.00, 84.00]},
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with aggregate functions (Sum, Max, Min, Avg) for student scores.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};


export const ValueFormatter: Story = {
  args: {
    columnDefs: [
      {
        field: 'assessmentName',
        headerName: 'Assessment Name',
        lockPosition: true,
        sortable: false,
        resizable: false,
      },
      {
        field: 'assessmentType',
        headerName: 'Assessment Type',
        lockPosition: true,
        sortable: false,
        resizable: false,
        valueFormatter: (item) => {
          return item.value ? item.value.replace(/_/g, ' ') : '';
        },
      },
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition: true, sortable: false, resizable: false },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz_Test', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework_Assignment', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Final_Exam', isActive: true },
    ],
    
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with a value formatter applied to the Assessment Type column, replacing underscores with spaces for better readability.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" [gridOptions]="options" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const CellValueGetterSum: Story = {
  args: {
    columnDefs: [
      {
        field: 'assessmentName',
        headerName: 'Assessment Name',
        lockPosition: true,
        sortable: false,
        resizable: false,
      },
      {
        field: 'value1',
        headerName: 'Value 1',
        lockPosition: true,
        sortable: false,
        resizable: false,
      },
      {
        field: 'value2',
        headerName: 'Value 2',
        lockPosition: true,
        sortable: false,
        resizable: false,
      },
      {
        headerName: 'Sum',
        valueGetter: (params) => {
          return params.data.value1 + params.data.value2;
        },
        lockPosition: true,
        sortable: false,
        resizable: false,
      },
    ],
    dataSource: [
      { assessmentName: 'Math Test', value1: 10, value2: 15 },
      { assessmentName: 'Science Project', value1: 20, value2: 25 },
      { assessmentName: 'History Exam', value1: 30, value2: 35 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with a cell value getter that computes the sum of two numerical columns (`value1` and `value2`) and displays it in the "Sum" column.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" [gridOptions]="options"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};


export const CellDataTypes: Story = {
  args: {
    columnDefs: [
      {
        field: 'assessmentName',
        headerName: 'Assessment Name',
        valueFormatter: (params) => {
          return params.value ? params.value.toUpperCase() : '';
        },
      },
      {
        field: 'score',
        headerName: 'Score',
        valueFormatter: (params) => {
          return params.value ? params.value.toFixed(2) : '0.00';
        },
      },
      {
        field: 'isActive',
        headerName: 'Active',
        cellRenderer: (params:any) => {
          return params.value ? 'Yes' : 'No';
        },
      },
      {
        field: 'lastUpdated',
        headerName: 'Last Updated',
        valueFormatter: (params) => {
          const date = new Date(params.value);
          return date ? date.toLocaleDateString() : '';
        },
      },
    ],
    dataSource: [
      { assessmentName: 'Math Test', score: 87.34, isActive: true, lastUpdated: '2024-09-01' },
      { assessmentName: 'Science Project', score: 92.56, isActive: false, lastUpdated: '2024-09-15' },
      { assessmentName: 'History Exam', score: 78.23, isActive: true, lastUpdated: '2024-08-21' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with various cell data types including text, number, boolean, and date fields. Each field uses appropriate formatting or rendering for its respective data type.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const CellReferenceData: Story = {
  args: {
    columnDefs: [
      {
        field: 'assessmentId',
        headerName: 'Assessment ID',
      },
      {
        field: 'assessmentName',
        headerName: 'Assessment Name',
        valueGetter: (params) => {
          const assessmentLookup: { [key: number]: string } = {
            1: 'Math Test',
            2: 'Science Project',
            3: 'History Exam',
          };

          const assessmentId = params.data.assessmentId as number;
          return assessmentLookup[assessmentId] || 'Unknown';
        },
      },
      {
        field: 'score',
        headerName: 'Score',
        valueFormatter: (params) => {
          return params.value ? params.value.toFixed(2) : '0.00';
        },
      },
      {
        field: 'isActive',
        headerName: 'Active',
        cellRenderer: (params:any) => {
          return params.value ? 'Yes' : 'No';
        },
      },
    ],
    dataSource: [
      { assessmentId: 1, score: 87.34, isActive: true },
      { assessmentId: 2, score: 92.56, isActive: false },
      { assessmentId: 3, score: 78.23, isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with cell reference data. The `assessmentId` column is cross-referenced with an external lookup object to display human-readable assessment names.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};


export const CellTextEditing: Story = {
  args: {
    columnDefs: [
      {
        field: 'assessmentName',
        headerName: 'Assessment Name',
        editable: true,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'assessmentType',
        headerName: 'Assessment Type',
        editable: true,
        cellEditor: 'agSelectCellEditor', 
        cellEditorParams: {
          values: ['Quiz', 'Homework', 'Test', 'Project'], 
        },
        filter: 'agTextColumnFilter',
      },
      {
        field: 'date',
        headerName: 'Date',
        editable: true,
        cellEditor: 'agDateCellEditor', 
        valueFormatter: (params) => {
          return params.value ? new Date(params.value).toLocaleDateString() : '';
        },
      },
      {
        field: 'score',
        headerName: 'Score',
        editable: true,
        valueFormatter: (params) => {
          return params.value ? params.value.toFixed(2) : '0.00';
        },
      },
      {
        field: 'isActive',
        headerName: 'Active',
        editable: true,
        cellEditor: 'agCheckboxCellEditor',
        cellRenderer: (params:any) => {
          return params.value ? 'Yes' : 'No';
        },
      },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', date: new Date(), score: 87.34, isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', date: new Date(), score: 92.56, isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', date: new Date(), score: 78.23, isActive: true },
    ],
    options: {
      onCellValueChanged: (event) => {
        console.log('Cell value changed:', event);
      },
      rowSelection: 'single',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with editable cells, including a dropdown for the Assessment Type, a date picker, and a checkbox for Active status.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

























