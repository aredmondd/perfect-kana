<template>
    <!-- Backdrop and palette container -->
    <div
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-accent/75 z-50"
      @click.self="closePalette"
    >
      <div class="bg-background rounded-md shadow-lg w-11/12 max-w-lg">
        <!-- Search input -->
        <div class="p-4">
          <input
            v-model="search"
            @keydown.escape="closePalette"
            type="text"
            placeholder="Search commands..."
            class="w-full border-2 border-accent rounded-md px-3 py-2 focus:outline-none"
            autofocus
          />
        </div>
        <!-- Command list -->
        <ul>
          <li
            v-for="command in filteredCommands"
            :key="command.name"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click="selectCommand(command)"
          >
            <span class="font-medium">{{ command.name }}</span>
            <p class="text-sm text-gray-500">{{ command.description }}</p>
          </li>
          <!-- Optionally, show a message when no commands match -->
          <li v-if="filteredCommands.length === 0" class="px-4 py-2 text-gray-500">
            No matching commands.
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  
  // Controls whether the palette is open
  const isOpen = ref(false);
  // Model for the search query
  const search = ref('');
  
  // Define your commands. Each command can have a name, description, and an action callback.
  const commands = ref([
    {
      name: 'Home',
      description: 'Navigate to the homepage',
      action: () => console.log('Navigating to Home'),
    },
    {
      name: 'Profile',
      description: 'Go to your profile',
      action: () => console.log('Navigating to Profile'),
    },
    {
      name: 'Settings',
      description: 'Open settings panel',
      action: () => console.log('Opening Settings'),
    },
    // Add more commands as needed...
  ]);
  
  // Computed filtered list based on the search query.
  const filteredCommands = computed(() => {
    if (!search.value) return commands.value;
    return commands.value.filter(cmd =>
      cmd.name.toLowerCase().includes(search.value.toLowerCase())
    );
  });
  
  // Opens the command palette
  function openPalette() {
    isOpen.value = true;
    search.value = '';
  }
  
  // Closes the palette
  function closePalette() {
    isOpen.value = false;
  }
  
  // Toggles the palette
  function togglePalette() {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      search.value = '';
    }
  }
  
  // Executes the command's action and closes the palette
  function selectCommand(command) {
    command.action();
    closePalette();
  }
  
  // Global keyboard handler for the shortcut (Ctrl+K or ⌘+K)
  function handleKeyDown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      togglePalette();
    }
  }
  
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
</script>