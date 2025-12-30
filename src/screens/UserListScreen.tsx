import React, { useState, useCallback, useRef, useMemo } from 'react';
import { View, FlatList, RefreshControl, LayoutAnimation, Platform, UIManager } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useUsers } from '../context/UserContext';
import { UserItem } from '../components/UserItem';
import { SearchBar } from '../components/SearchBar';
import { TabBar } from '../components/TabBar';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { UserRole, ZellerCustomer } from '../types';
import { useUserActions } from '../hooks/useUserActions';
import { useFilteredUsers } from '../hooks/useFilteredUsers';
import { showConfirmDialog } from '../components/ConfirmDialog';
import { TABS } from '../constants';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UserListScreen: React.FC = () => {
  const { users, loading, refreshing, syncFromAPI } = useUsers();
  const { handleDelete: deleteUser, navigateToEdit } = useUserActions();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<UserRole>('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const pagerRef = useRef<PagerView>(null);

  const allUsers = useFilteredUsers({ users, searchQuery, role: 'All' });
  const adminUsers = useFilteredUsers({ users, searchQuery, role: 'Admin' });
  const managerUsers = useFilteredUsers({ users, searchQuery, role: 'Manager' });

  React.useEffect(() => {
    if (deletingUserId === null) {
      LayoutAnimation.configureNext({
        duration: 200,
        create: { type: 'easeInEaseOut', property: 'opacity' },
        update: { type: 'easeInEaseOut' },
      });
    }
  }, [users.length, searchQuery, deletingUserId]);

  const handleRefresh = useCallback(async () => {
    await syncFromAPI();
  }, [syncFromAPI]);

  const handlePageSelected = useCallback((e: any) => {
    const page = e.nativeEvent.position;
    setCurrentPage(page);
    setActiveTab(TABS[page]);
  }, []);

  const handleTabChange = useCallback((tab: UserRole) => {
    setActiveTab(tab);
    const tabIndex = TABS.indexOf(tab);
    pagerRef.current?.setPage(tabIndex);
  }, []);

  const handleDelete = useCallback(
    (user: ZellerCustomer) => {
      showConfirmDialog({
        title: 'Delete User',
        message: `Are you sure you want to delete ${user.name}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        destructive: true,
        onConfirm: async () => {
          setDeletingUserId(user.id);
          setTimeout(async () => {
            await deleteUser(user);
            setDeletingUserId(null);
          }, 300);
        },
      });
    },
    [deleteUser]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: ZellerCustomer; index: number }) => (
      <UserItem
        user={item}
        index={index}
        isDeleting={deletingUserId === item.id}
        onPress={() => navigateToEdit(item)}
        onDelete={() => handleDelete(item)}
      />
    ),
    [navigateToEdit, handleDelete, deletingUserId]
  );

  const keyExtractor = useCallback((item: ZellerCustomer) => item.id, []);

  const renderEmptyComponent = useCallback(
    () => <EmptyState title="No users found" message="Try pulling down to refresh" />,
    []
  );

  const renderUserList = useCallback(
    (role: UserRole) => {
      const listUsers = role === 'All' ? allUsers : role === 'Admin' ? adminUsers : managerUsers;

      if (listUsers.length === 0) {
        const emptyTitle = searchQuery.trim() ? 'No users found' : 'No users yet';
        const emptyMessage = searchQuery.trim()
          ? `No users match "${searchQuery}"`
          : users.length === 0 && !refreshing
          ? 'Pull down to sync from API'
          : undefined;

        return <EmptyState title={emptyTitle} message={emptyMessage} />;
      }

      return (
        <FlatList
          data={listUsers}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#6C5CE7" colors={['#6C5CE7']} />
          }
          contentContainerStyle={{
            paddingBottom: 16,
            flexGrow: 1,
          }}
          style={{ flex: 1 }}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={10}
          showsVerticalScrollIndicator={true}
          getItemLayout={(data, index) => ({
            length: 80,
            offset: 80 * index,
            index,
          })}
        />
      );
    },
    [allUsers, adminUsers, managerUsers, searchQuery, users.length, refreshing, handleRefresh, keyExtractor, renderItem, renderEmptyComponent]
  );

  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} page={currentPage} />
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        <View key="0" style={{ flex: 1 }}>{renderUserList('All')}</View>
        <View key="1" style={{ flex: 1 }}>{renderUserList('Admin')}</View>
        <View key="2" style={{ flex: 1 }}>{renderUserList('Manager')}</View>
      </PagerView>
    </View>
  );
};

export default UserListScreen;

