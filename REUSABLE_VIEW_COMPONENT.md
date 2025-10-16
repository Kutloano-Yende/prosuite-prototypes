# 🔄 Reusable Table View Component

## 🎯 **Overview**

I've created a **reusable `TableViewModal` component** that can be used across all tables in the ProSuite system. This component provides a consistent, professional view modal for any data type with minimal code.

## 🚀 **How to Use**

### **1. Import the Hook and Component**

```typescript
import { TableViewModal, useTableViewModal } from '@/components/ui'
```

### **2. Use the Hook in Your Component**

```typescript
const { isOpen, selectedItem, config, openModal, closeModal } = useTableViewModal()
```

### **3. Add View Button Handler**

```typescript
const handleViewItem = (item: YourDataType) => {
  openModal(item, 'your-type') // 'policy', 'obligation', 'assessment', etc.
}
```

### **4. Add View Button to Table**

```typescript
<button 
  onClick={() => handleViewItem(item)}
  className="text-blue-600 hover:text-blue-900"
>
  View
</button>
```

### **5. Add Modal to JSX**

```typescript
<TableViewModal
  isOpen={isOpen}
  onClose={closeModal}
  data={selectedItem}
  config={config}
/>
```

## 📋 **Supported Data Types**

The component automatically configures itself based on the type you pass:

- **`'policy'`** - Policy view with policy-specific fields
- **`'obligation'`** - Compliance obligation view
- **`'assessment'`** - Assessment view
- **`'action-plan'`** - Action plan view

## 🎨 **Features**

### **Automatic Configuration**
- **Field Mapping**: Automatically maps data fields to display
- **Badge Colors**: Status, priority, and regulation badges with proper colors
- **Icons**: Contextual icons for dates, users, and actions
- **Sections**: Organized content sections with different styles

### **Consistent Layout**
- **Two-Panel Design**: Main content + sidebar details
- **Professional Header**: Title, description, and action buttons
- **Upload Area**: Standard file upload section
- **Tags Section**: Automatic tag generation from data
- **Related Items**: Placeholder for related content

### **Responsive Design**
- **Mobile Friendly**: Adapts to different screen sizes
- **Scrollable Content**: Handles long content gracefully
- **Keyboard Support**: ESC key to close, backdrop click

## 🔧 **Configuration**

### **Pre-configured Types**

Each data type has a pre-configured setup:

#### **Policy Configuration**
```typescript
{
  title: 'Policy Details',
  type: 'policy',
  fields: [
    { label: 'POLICY ID', value: 'policyNumber', type: 'text' },
    { label: 'STATUS', value: 'status', type: 'badge', badgeColor: 'green' },
    { label: 'OWNER', value: 'owner', type: 'text', icon: <UserIcon /> },
    // ... more fields
  ],
  sections: [
    { title: 'Policy Description', content: 'description', type: 'default' }
  ],
  actions: [
    { label: 'Edit', onClick: () => {}, variant: 'primary', icon: <EditIcon /> }
  ]
}
```

#### **Obligation Configuration**
```typescript
{
  title: 'Compliance Obligation',
  type: 'obligation',
  fields: [
    { label: 'OBLIGATION ID', value: 'obligationCode', type: 'text' },
    { label: 'STATUS', value: 'status', type: 'badge', badgeColor: 'green' },
    { label: 'PRIORITY', value: 'priority', type: 'badge', badgeColor: 'red' },
    // ... more fields
  ],
  sections: [
    { title: 'Compliance Requirements', content: 'description', type: 'default' },
    { title: 'Evidence Required', content: 'Evidence items', type: 'info', items: 'evidenceRequired' },
    { title: 'Consequences', content: 'consequencesOfNonCompliance', type: 'warning' }
  ]
}
```

## 📝 **Example Implementation**

### **Before (Old Way)**
```typescript
// Each page needed its own modal component
const [isModalOpen, setIsModalOpen] = useState(false)
const [selectedItem, setSelectedItem] = useState(null)

const handleView = (item) => {
  setSelectedItem(item)
  setIsModalOpen(true)
}

// Custom modal JSX with hardcoded fields
<CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  {/* 50+ lines of custom JSX */}
</CustomModal>
```

### **After (New Way)**
```typescript
// One hook handles everything
const { isOpen, selectedItem, config, openModal, closeModal } = useTableViewModal()

const handleView = (item) => {
  openModal(item, 'policy') // Just specify the type!
}

// One line of JSX
<TableViewModal isOpen={isOpen} onClose={closeModal} data={selectedItem} config={config} />
```

## 🎯 **Benefits**

### **1. Consistency**
- **Same Look**: All view modals look identical
- **Same Behavior**: Consistent interactions across the system
- **Same Features**: Upload, tags, related items everywhere

### **2. Maintainability**
- **Single Source**: One component to maintain
- **Easy Updates**: Change once, applies everywhere
- **Bug Fixes**: Fix once, fixed everywhere

### **3. Developer Experience**
- **Less Code**: 90% less code per page
- **No Duplication**: No repeated modal code
- **Type Safety**: Full TypeScript support

### **4. User Experience**
- **Familiar Interface**: Users learn once, use everywhere
- **Consistent Actions**: Edit buttons work the same way
- **Professional Look**: Enterprise-grade appearance

## 🔄 **Adding New Types**

To add a new data type:

1. **Add Configuration** in `tableViewConfigs.ts`:
```typescript
export const newTypeViewConfig: TableViewConfig = {
  title: 'New Type Details',
  type: 'new-type',
  fields: [/* your fields */],
  sections: [/* your sections */],
  actions: [/* your actions */]
}
```

2. **Update Helper Function**:
```typescript
export const getViewConfig = (type: string): TableViewConfig => {
  switch (type) {
    case 'new-type':
      return newTypeViewConfig
    // ... existing cases
  }
}
```

3. **Use in Your Page**:
```typescript
openModal(item, 'new-type')
```

## 🎉 **Result**

Now **every table in your system** can have a professional view modal with just **3 lines of code**:

1. Import the hook
2. Add the view handler
3. Add the modal JSX

The component automatically handles all the complex layout, styling, and functionality! 🚀
